const express = require('express');
const pool = require('./database');
const cors = require('cors')
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;

const app = express();

app.use(cors({
    origin: 'http://localhost:3001', 
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true 
  }));


// The express.json() function is a built-in middleware function in Express. 
// It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());
app.use(cookieParser());

const secret = "gdgdhdbcb770785rgdzqws";
const maxAge = 60 * 60;
const generateJWT = (id) => {
    return jwt.sign({ id }, secret, { expiresIn: maxAge })
}

// POST (create a new post)
app.post('/api/posts', async(req, res) => {
    try {
        console.log("a post request has arrived");
        const post = req.body;
        const newpost = await pool.query(
            "INSERT INTO posttable(body, username, date) values ($1, $2, $3)    RETURNING*", [post.body, post.username, post.date]
            // $1, $2, $3 are mapped to the first, second and third element of the passed array (post.title, post.body, post.urllink)
            // The RETURNING keyword in PostgreSQL allows returning a value from the insert or update statement.
            // using "*" after the RETURNING keyword in PostgreSQL, will return everything
        );
        res.json(newpost);
    } catch (err) {
        console.error(err.message);
    }
}); 

// GET (get all the posts)
app.get('/api/posts', async(req, res) => {
    try {
        console.log("get posts request has arrived");
        const posts = await pool.query(
            "SELECT * FROM posttable"
        );
        res.json(posts.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// URL example: http://localhost:3000/api/posts/1
// GET (get a post with specific id)
app.get('/api/posts/:id', async(req, res) => {
    try {
        console.log("get a post with route parameter  request has arrived");
        // The req.params property is an object containing properties mapped to the named route "parameters". 
        // For example, if you have the route /posts/:id, then the "id" property is available as req.params.id.
        const { id } = req.params; // assigning all route "parameters" to the id "object"
        const posts = await pool.query( // pool.query runs a single query on the database.
            //$1 is mapped to the first element of { id } (which is just the value of id). 
            "SELECT * FROM posttable WHERE id = $1", [id]
        );
        res.json(posts.rows[0]); // we already know that the row array contains a single element, and here we are trying to access it
        // The res.json() function sends a JSON response. 
        // This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using the JSON.stringify() method.
    } catch (err) {
        console.error(err.message);
    }
});

// PUT (update a post)
app.put('/api/posts/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const post = req.body;
        console.log("update request has arrived");
        const updatepost = await pool.query(
            "UPDATE posttable SET (body, username, date) = ($2, $3, $4) WHERE id = $1", [id, post.body, post.username, post.date]
        );
        res.json(updatepost);
    } catch (err) {
        console.error(err.message);
    }
});

// DELETE (delete a post with a specific id)
app.delete('/api/posts/:id', async(req, res) => {
    try {
        const { id } = req.params;
        //const post = req.body; // we do not need a body for a delete request
        console.log("delete a post request has arrived");
        const deletepost = await pool.query(
            "DELETE FROM posttable WHERE id = $1", [id]
        );
        res.json(deletepost);
    } catch (err) {
        console.error(err.message);
    }
}); 

// DELETE (delete all posts)
app.delete('/api/posts', async (req, res) => {
    try {
        await pool.query("DELETE FROM posttable");
        res.status(200).json({ message: "All posts deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Failed to delete posts" });
    }
});

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});
app.get('/auth/authenticate', async(req, res) => {
    console.log('authentication request has been arrived');
    const token = req.cookies.jwt; 
    let authenticated = false;
    try {
        if (token) { 
            await jwt.verify(token, secret, (err) => { //token exists, now we try to verify it
                if (err) { // not verified, redirect to login page
                    console.log(err.message);
                    console.log('token is not verified');
                    res.redirect('/login')
                } else { // token exists and it is verified 
                    console.log('author is authinticated');
                    authenticated = true;
                    res.send({ "authenticated": authenticated })
                    
                }
            })
        } else { 
            console.log('author is not authinticated');
            res.send({ "authenticated": authenticated });
            res.redirect('/login')
        }
    } catch (err) {
        console.error(err.message);
    }
});
// signup a user
app.post('/auth/signup', async (req, res) => {
    try {
      console.log("A signup request has arrived");
      const { username, password } = req.body;
  
      const bcryptPassword = await bcrypt.hash(password, await bcrypt.genSalt());
      const authUser = await pool.query(
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
        [username, bcryptPassword]
      );
      console.log(authUser.rows[0].username);
  
      const token = await generateJWT(authUser.rows[0].username);
      console.log(token);
  
      res.status(201)
        .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
        .json({ user_id: authUser.rows[0].username });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ error: err.message });
    }
  });
  

app.post('/auth/login', async(req, res) => {
    try {
        console.log("a login request has arrived");
        const { username, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (user.rows.length === 0) return res.status(401).json({ error: "User is not registered" });

        //Checking if the password is correct
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        //console.log("validPassword:" + validPassword);
        if (!validPassword) return res.status(401).json({ error: "Incorrect password" });

        const token = await generateJWT(user.rows[0].id);
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({isAuthed: true})
            .send;
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

//logout a user
app.post('/auth/logout', (req, res) => {
    res.clearCookie('jwt');
    res.send({ message: "Logged out successfully" });
});

//logout a user = deletes the jwt
app.get('/auth/logout', (req, res) => {
    console.log('delete jwt request arrived');
    res.status(202).clearCookie('jwt').json({ "Msg": "cookie cleared" }).send
});

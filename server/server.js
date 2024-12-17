const express = require('express');
const pool = require('./database');
const cors = require('cors')
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;

const app = express();

app.use(cors({
    origin: 'http://localhost:3001', // Veebilehe aadress
    methods: ['GET', 'POST'],
    credentials: true // Kui kasutate küpsiseid
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
app.delete('/api/posts/', async(req, res) => {
    try {
        // const { id } = req.params;
        // const post = req.body; // we do not need a body for a delete request
        console.log("delete all posts request has arrived");
        const deleteallposts = await pool.query(
            "DELETE FROM posttable"
        );
        res.json(deleteallposts);
    } catch (err) {
        console.error(err.message);
    }
}); 

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});
// signup a user
app.post('/auth/signup', async(req, res) => {
    try {
        console.log("a signup request has arrived");
        //console.log(req.body);
        const { username, password } = req.body;

        const salt = await bcrypt.genSalt(); //  generates the salt, i.e., a random string
        const bcryptPassword = await bcrypt.hash(password, salt) // hash the password and the salt 
        const authUser = await pool.query( // insert the user and the hashed password into the database
            "INSERT INTO users(username, password) values ($1, $2) RETURNING*", [username, bcryptPassword]
        );
        console.log(authUser.rows[0].id);
        const token = await generateJWT(authUser.rows[0].id); // generates a JWT by taking the user id as an input (payload)
        //console.log(token);
        //res.cookie("isAuthorized", true, { maxAge: 1000 * 60, httpOnly: true });
        //res.cookie('jwt', token, { maxAge: 6000000, httpOnly: true });
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: authUser.rows[0].id })
            .send;
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;
  
    // Oletame, et kasutaja andmed on salvestatud andmebaasis
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
      }
      
      if (result.length === 0) {
        return res.status(401).json({ success: false, message: "Invalid username or password" });
      }
  
      const user = result[0];
      
      // Võrrelge parooli (võiks kasutada bcrypt, et võrrelda parooli)
      if (password !== user.password) { // Siin peaks olema turvalisem meetod nagu bcrypt
        return res.status(401).json({ success: false, message: "Invalid username or password" });
      }
  
      // Kui kõik on õige, tagastame õnnestumise vastuse
      res.json({ success: true, message: "Login successful", userId: user.id });
    });
  });

//logout a user = deletes the jwt
app.get('/auth/logout', (req, res) => {
    console.log('delete jwt request arrived');
    res.status(202).clearCookie('jwt').json({ "Msg": "cookie cleared" }).send
});
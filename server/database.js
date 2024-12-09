const Pool = require('pg').Pool;
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: process.env.DB_PORT
});


const execute = async(query) => {
    try {
        await pool.connect(); // gets connection
        await pool.query(query); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

// A simple query that creates a table in our database
// Note that the "SERIAL"  pseudo-type that is used after the "id" is used to create a sequence object,
// and set the next value generated by the sequence as the default value for the column
const createTblQuery = `
CREATE TABLE IF NOT EXISTS "posttable" (
    "id" SERIAL PRIMARY KEY,         
    "title" VARCHAR(200) NOT NULL,
    "body" VARCHAR(200) NOT NULL,
    "urllink" VARCHAR(200)  
);`;


const createData = `
INSERT INTO "posttable" ("title", "body", "urllink") VALUES 
('Sample Title', 'Sample Body', 'http://example.com'),
('Another Title', 'Another Body', 'http://example2.com');
`;

// A function to execute the previous query   
execute(createTblQuery).then(result => {
    if (result) {
        console.log('If does not exists, create the "posttable" table');
    }
});

execute(createData).then(result => {
    if (result) {
        console.log('Fill the "posttable" table with initial data');
    }
});

module.exports = pool;
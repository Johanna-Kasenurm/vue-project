require('dotenv').config(); // Load environment variables from .env file
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
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
    "body" VARCHAR(200) NOT NULL,
    "date" VARCHAR(200) NOT NULL,
    "username" VARCHAR(200) NOT NULL
);`;


const createTblQuery2 = `
CREATE TABLE IF NOT EXISTS "users" (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL 
);`;


const createData = `
INSERT INTO "posttable" ("body", "date", "username") VALUES 
('Sample Body', 'Dec 15, 2024', 'Sam Smith'),
('Another Body', 'Dec 15, 2024', 'Simona Black');
`;

/*
const createData2 = `
INSERT INTO "users" ("username", "password") VALUES 
('Sam Smith', '12345'),
('Simona Black', '67890');
`;
*/

// A function to execute the previous query   
execute(createTblQuery).then(result => {
    if (result) {
        console.log('If does not exists, create the "posttable" and "users" tables');
        execute(createData).then(result => {
            if (result) {
                console.log('Fill the "posttable" table with initial data');
            }
        });
    }
});

execute(createTblQuery2).then(result => {
    if (result) {
        console.log('If does not exists, create the "users" tables');
        /*
        execute(createData2).then(result => {
            if (result) {
                console.log('Fill the "users" table with initial data');
            }
        });
        */
    }
});


module.exports = pool;
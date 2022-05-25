//Import express 
const express = require("express");
//import mysql2
const mysql = require("mysql2");

//port designation for server.js
const PORT = process.env.PORT || 3001;
//app expression
const app = express();
//Express.js middleware that converts post data to key/value pairings
app.use(express.urlencoded({ extended: false }));
//Express.js middleware that parses post data into JavaScript object req.body
app.use(express.json());

//connect to SQL database
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "&7970n&P!5So9@)",
        database: "election"
    },
    console.log("Connected to the election database")
);
//runs SQL query and executes callback with rows that match query
// Get full list of candidates
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows)
// });

//Get a single candidate
// db.query(`SELECT * FROM candidates WHERE id = 100`, (err, row) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(row);
// });

//Delete a candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });

//Create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
                VALUES (?, ?, ?, ?)`;
const params = [2, "Virginia", "Woolf", 1];

db.query(sql, params, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
});

//Route to handle unsupported user requests
app.use((req, res) => {
    res.status(404).end();
});

//starts express.js server on port 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
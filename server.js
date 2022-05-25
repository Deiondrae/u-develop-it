//Import express 
const express = require("express");
//import mysql2
const mysql = require("mysql2");
const inputCheck = require("./utils/inputCheck");



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
app.get("/api/candidates", (req, res) => {
    const sql = `SELECT * FROM candidates`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            data: rows
        });
    });
});


//Get a single candidate
app.get("/api/candidate/:id", (req, res) => {
    const sql = `SELECT * FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: "success",
            data: row
        });
    });
});


//Delete a candidate
app.delete("/api/candidate/:id", (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: "Candidate not found"
            });
        } else {
            res.json({
                message: "deleted",
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});


//Create a candidate
app.post("/api/candidate", ({ body }, res) => {
    const errors = inputCheck(body, "first_name", "last_name", "industry_connected");
    if (errors) {
        res.status(400).json({ error: errors});
    }
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
        VALUES (?, ?, ?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            data: body
        });
    });
});



// Route to handle unsupported user requests
app.use((req, res) => {
    res.status(404).end();
});

//starts express.js server on port 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
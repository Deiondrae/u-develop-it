//Import express to use
const express = require("express");

//port designation
const PORT = process.env.PORT || 3001;
//app expression
const app = express();
//Express.js middleware that converts post data to key/value pairings
app.use(express.urlencoded({ extended: false }));
//Express.js middleware that parses post data into JavaScript object req.body
app.use(express.json());


//Route to handle unsupported user requests
app.use((req, res) => {
    res.status(404).end();
});

//starts express.js server on port 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
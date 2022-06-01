//Import express 
const express = require("express");
// import connection.js
const db = require('./db/connection');
// Add near the top of the file
const apiRoutes = require('./routes/apiRoutes');

//port designation for server.js
const PORT = process.env.PORT || 3001;
//app expression
const app = express();
//Express.js middleware that converts post data to key/value pairings
app.use(express.urlencoded({ extended: false }));
//Express.js middleware that parses post data into JavaScript object req.body
app.use(express.json());
//import api routes
app.use('/api', apiRoutes);


// Route to handle unsupported user requests
app.use((req, res) => {
    res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
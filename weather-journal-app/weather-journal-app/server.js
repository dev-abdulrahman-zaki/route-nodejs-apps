// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Post Route
app.post('/add', (req, res) => {
    projectData.date = req.body.date;
    projectData.temp = req.body.temp;
    projectData.content = req.body.content;
    res.send(projectData);
  });

// Initialize all route with a callback function
// Callback function to complete GET '/all'
app.get('/all', (req, res) => {
    res.send(projectData);
  });

// Setup Server
const port = 8888;
const server = app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config.js');
const errorHandler = require('./errorHandler');
const authroutes = require('./authRoutes'); // Make sure the path is correct

const app = express();
const port = config.port;


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', authroutes); // All routes will be prefixed with /api



// Routes with multer middleware for file uploads

// Error handling middleware
app.use(errorHandler);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");    
  next();
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
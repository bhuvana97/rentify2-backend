const jwt = require('jsonwebtoken');
const config = require('./config.js');

const generateToken = (id) => {
  const payload = {
    id,
    timestamp: new Date().getTime() // Adding a timestamp to ensure uniqueness
  };
  
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn, // e.g., '1h' for 1 hour
  });
};

module.exports = generateToken;
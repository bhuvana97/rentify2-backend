const jwt = require('jsonwebtoken');
const config = require('./config.js');
const { findUserById } = require('./userModel');

const authMiddleware = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send('No token provided');
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(500).send('Failed to authenticate token');
    }

    findUserById(decoded.id, (err, results) => {
      if (err) {
        return res.status(500).send('Error on the server');
      }
      if (results.length === 0) {
        return res.status(404).send('User not found');
      }

      req.user = results[0];
// req.user=user;
      next();
    });
  });
};

module.exports = authMiddleware;
const jwt = require('jsonwebtoken');

// Token generation function
// JWT generate karke login session maintain karne ke liye
const generateToken = (id, type) => {
  // Using 'type' key to match the schema
  return jwt.sign({ id, type }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = generateToken;

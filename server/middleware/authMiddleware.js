const jwt = require('jsonwebtoken');

// Role based access control middleware
// Yeh middleware check karega ki user logged in hai ya nahi, aur uska role kya hai.
const protect = async (req, res, next) => {
  let token;

  // Header mein authorization check kar rahe hain
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Token extract kar rahe hain
      token = req.headers.authorization.split(' ')[1];

      // Token verify kar rahe hain
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // User info request object mein save kar rahe hain (req.user)
      req.user = decoded;
      
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Admin only access middleware
const adminOnly = (req, res, next) => {
  if (req.user && req.user.type === 'Admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Admin only' });
  }
};

// Owner only access middleware
const ownerOnly = (req, res, next) => {
  if (req.user && req.user.type === 'Owner') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Owner only' });
  }
};

module.exports = { protect, adminOnly, ownerOnly };

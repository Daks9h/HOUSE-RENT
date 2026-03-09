const express = require('express');
const router = express.Router();
const { getAllUsers, getAllProperties, getAllBookings, updateUserGrantStatus } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Admin Routes
// Sabhi admin routes ko hum protect middleware se secure karenge.
// protect: Token validation ke liye
// adminOnly: Check karne ke liye ki logged in user admin hi hai.

router.get('/users', protect, adminOnly, getAllUsers);
router.get('/properties', protect, adminOnly, getAllProperties);
router.get('/bookings', protect, adminOnly, getAllBookings);
router.put('/users/:id/grant', protect, adminOnly, updateUserGrantStatus);

module.exports = router;

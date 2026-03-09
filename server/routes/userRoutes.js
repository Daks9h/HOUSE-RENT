const express = require('express');
const router = express.Router();
const { registerUser, authUser, getProperties, bookProperty, getRenterStats, getMyBookings, toggleSaveProperty, getSavedProperties } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Public Access Routes
// Yeh routes koi bhi use kar sakta hai (Login/Signup/Browse)
router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/properties', getProperties); // Renters can browse properties

// Protected Renter/User Routes
// Booking karne ke liye login (token) compulsory hai
router.post('/bookings', protect, bookProperty);
router.get('/stats', protect, getRenterStats);
router.get('/my-bookings', protect, getMyBookings);
router.post('/save-property/:id', protect, toggleSaveProperty);
router.get('/saved-ids', protect, getSavedProperties);

module.exports = router;

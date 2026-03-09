const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { addProperty, getMyProperties, getOwnerBookings, getOwnerStats, updateBookingStatus, deleteProperty, updateProperty } = require('../controllers/ownerController');
const { protect, ownerOnly } = require('../middleware/authMiddleware');

// Multer Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Owner Routes
router.post('/add-property', protect, ownerOnly, upload.single('propertyImage'), addProperty);
router.get('/my-properties', protect, ownerOnly, getMyProperties);
router.get('/bookings', protect, ownerOnly, getOwnerBookings);
router.get('/stats', protect, ownerOnly, getOwnerStats);
router.put('/update-status', protect, ownerOnly, updateBookingStatus);
router.delete('/property/:id', protect, ownerOnly, deleteProperty);
router.put('/property/:id', protect, ownerOnly, updateProperty);

module.exports = router;

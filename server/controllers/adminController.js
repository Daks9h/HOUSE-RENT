const User = require('../models/UserSchema');
const Property = require('../models/PropertySchema');
const Booking = require('../models/BookingSchema');

// @desc Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find({}).populate('ownerId', 'name');
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate('userID', 'name')
      .populate('propertyId', 'propertyAddress');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update user grant status (For Owners)
const updateUserGrantStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Toggle the grant status
    user.isGranted = !user.isGranted;
    await user.save();
    
    res.json({ 
      message: `User access ${user.isGranted ? 'granted' : 'revoked'} successfully`,
      isGranted: user.isGranted
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getAllProperties,
  getAllBookings,
  updateUserGrantStatus
};

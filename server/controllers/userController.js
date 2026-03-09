const User = require('../models/UserSchema');
const Property = require('../models/PropertySchema');
const Booking = require('../models/BookingSchema');
const generateToken = require('../utils/generateToken');

// @desc Register new user
const registerUser = async (req, res) => {
  const { name, email, password, type } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password, type });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        type: user.type,
        token: generateToken(user._id, user.type),
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Auth user
const authUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        type: user.type,
        token: generateToken(user._id, user.type),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all properties
const getProperties = async (req, res) => {
  try {
    const properties = await Property.find({}).populate('ownerId', 'name');
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Book a property
const bookProperty = async (req, res) => {
  const { propertyId, phone, userName } = req.body;

  try {
    const property = await Property.findById(propertyId);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    const booking = new Booking({
      propertyId,
      ownerID: property.ownerId,
      userID: req.user.id,
      userName,
      phone,
      bookingStatus: 'Pending',
      createdAt: new Date()
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Toggle Save property
const toggleSaveProperty = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const propertyId = req.params.id;

    const isSaved = user.savedProperties.includes(propertyId);
    if (isSaved) {
      user.savedProperties = user.savedProperties.filter(id => id.toString() !== propertyId);
    } else {
      user.savedProperties.push(propertyId);
    }

    await user.save();
    res.json(user.savedProperties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get saved properties IDs
const getSavedProperties = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.savedProperties || []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get renter stats
const getRenterStats = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const activeBookings = await Booking.countDocuments({ userID: req.user.id, bookingStatus: 'Approved' });
    const pendingRequests = await Booking.countDocuments({ userID: req.user.id, bookingStatus: 'Pending' });
    
    // Calculate total spent on Approved bookings
    const approvedBookings = await Booking.find({ userID: req.user.id, bookingStatus: 'Approved' }).populate('propertyId');
    const spentTotal = approvedBookings.reduce((acc, curr) => acc + (curr.propertyId?.propertyAmt || 0), 0);

    const savedHouses = user.savedProperties ? user.savedProperties.length : 0;

    res.json({
      activeBookings,
      pendingRequests,
      spentTotal,
      savedHouses
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get renter's own bookings
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userID: req.user.id }).populate('propertyId').populate('ownerID', 'name');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  registerUser, 
  authUser, 
  getProperties, 
  bookProperty, 
  getRenterStats, 
  getMyBookings, 
  toggleSaveProperty,
  getSavedProperties
};

const mongoose = require('mongoose');
const Property = require('../models/PropertySchema');
const Booking = require('../models/BookingSchema');

// @desc Add new property
const addProperty = async (req, res) => {
  const { 
    propertyType, 
    propertyAdType, 
    propertyAddress, 
    ownerContact, 
    propertyAmt, 
    additionalInfo, 
    ownerName 
  } = req.body;

  const propertyImage = req.file ? req.file.filename : '';

  try {
    const property = new Property({
      ownerId: req.user.id,
      propertyType,
      propertyAdType,
      propertyAddress,
      ownerContact,
      propertyAmt,
      additionalInfo,
      ownerName,
      propertyImage
    });

    const createdProperty = await property.save();
    res.status(201).json(createdProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get owner's properties
const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ ownerId: req.user.id });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete a property
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    
    // Check ownership
    if (property.ownerId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update a property
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    // Check ownership
    if (property.ownerId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get bookings for owner's properties
const getOwnerBookings = async (req, res) => {
  try {
    const properties = await Property.find({ ownerId: req.user.id });
    const propertyIds = properties.map(p => p._id);

    const bookings = await Booking.find({ propertyId: { $in: propertyIds } })
      .populate('userID', 'name email')
      .populate('propertyId', 'propertyAddress propertyType');
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update booking status (Approve/Reject)
const updateBookingStatus = async (req, res) => {
  const { bookingId, status } = req.body;
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.bookingStatus = status;
    await booking.save();
    res.json({ message: `Booking ${status} successfully`, booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get stats for owner dashboard
const getOwnerStats = async (req, res) => {
  try {
    // 1. Total Properties
    const totalProperties = await Property.countDocuments({ ownerId: req.user.id });
    
    // 2. Pending Bookings
    const properties = await Property.find({ ownerId: req.user.id });
    const propertyIds = properties.map(p => p._id);
    
    const pendingBookings = await Booking.countDocuments({ 
      propertyId: { $in: propertyIds },
      bookingStatus: 'Pending'
    });

    // 3. Total Potential Revenue (Sum of rent/sale amount of listed properties)
    const ownerProperties = await Property.find({ ownerId: req.user.id });
    const totalPotentialRevenue = ownerProperties.reduce((acc, curr) => acc + (curr.propertyAmt || 0), 0);

    res.json({
      totalProperties,
      pendingBookings,
      totalRevenue: totalPotentialRevenue
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  addProperty, 
  getMyProperties, 
  getOwnerBookings, 
  getOwnerStats, 
  updateBookingStatus, 
  deleteProperty, 
  updateProperty 
};

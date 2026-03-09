const mongoose = require('mongoose');

// Property Schema definition
// Yeh schema houses ki details (type, address, price, owner info) store karega
const propertySchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // User model se refer kar rahe hain
  },
  propertyType: {
    type: String,
    required: [true, 'Please provide a Property Type'],
  },
  propertyAdType: {
    type: String,
    required: [true, 'Please provide a Property Ad Type'],
  },
  propertyAddress: {
    type: String,
    required: [true, 'Please provide an Address'],
  },
  ownerContact: {
    type: String,
    required: [true, 'Please provide owner contact'],
  },
  propertyAmt: {
    type: Number,
    default: 0,
  },
  propertyImage: {
    type: Object, // Multiple URLs ya metadata ke liye object use kiya hai
  },
  additionalInfo: {
    type: String,
  },
  ownerName: {
    type: String,
  },
});

const Property = mongoose.model('propertyschema', propertySchema);

module.exports = Property;

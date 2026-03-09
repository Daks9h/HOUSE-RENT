const mongoose = require("mongoose");

// Define the Schema (the structure of the document)
// Yeh schema booking ki details (property, owner, user, phone etc.) store karega
const bookingSchema = new mongoose.Schema(
  {
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "propertyschema",
    },
    ownerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    userName: {
      type: String,
      required: [true, "Please provide a User Name"],
    },
    phone: {
      type: String,
      required: [true, "Please provide a Phone Number"],
    },
    bookingStatus: {
      type: String,
      required: [true, "Please provide a booking Type"],
    },
  },
  {
    strict: false, // Allows saving fields not defined in this schema
  }
);

// Compile the Model (the interface for the database)
const Booking = mongoose.model("bookingschema", bookingSchema);

module.exports = Booking;

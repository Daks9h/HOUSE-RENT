const mongoose = require('mongoose');

// Database connection function
// Yeh function check karega ki MongoDB se connection hua ya nahi
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

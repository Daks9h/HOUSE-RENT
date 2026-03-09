const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// User Model definition
const userModel = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    set: function (value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  type: {
    type: String,
    required: [true, "type is required"],
  },
  savedProperties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "propertyschema"
  }],
  isGranted: {
    type: Boolean,
    default: false,
  },
}, {
  strict: false,
});

// Password comparison method (Login ke liye)
userModel.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Password hashing before saving (Signup ke liye)
userModel.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const userSchema = mongoose.model("user", userModel);

module.exports = userSchema;

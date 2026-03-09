const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./db/config'); // Connected via db/config.js

// Routes imports
const adminRoutes = require('./routes/adminRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
const userRoutes = require('./routes/userRoutes');

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors()); // Enable CORS for client communication
app.use(express.json()); // Body parser for JSON data

// Serving static files (images)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Register Routes
// Sabhi API endpoints yahan mount kiye gaye hain
app.use('/api/admin', adminRoutes);
app.use('/api/owner', ownerRoutes);
app.use('/api/users', userRoutes);

// Root route for testing
app.get('/', (req, res) => {
  res.send('House Rent API is running smoothly...');
});

// Port configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

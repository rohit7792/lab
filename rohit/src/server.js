const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize the Express application
const app = express();
app.use(express.json()); // Middleware for parsing JSON data
app.use(cors()); // Enable CORS for all routes

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/userDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error:', err));

// Example route (replace with your actual route handler)
app.use('/api/users', require('./routes/users')); // Assuming you have a file './routes/users.js' for user-related routes

// Server listening on specified port
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const User = require('../models/User'); // Adjust the path as needed
const router = express.Router();
const bcrypt = require('bcrypt'); // For password hashing

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.json({ message: 'Signup successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error signing up' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists and if the password is correct
    if (user && await bcrypt.compare(password, user.password)) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

module.exports = router;

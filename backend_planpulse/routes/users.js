const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Route for user registration
router.post('/register', async (req, res) => {
  try {
    
    const { username, email, password } = req.body;

  // Check if the user with the provided email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User with this email already exists' });
  }

  // Create a new user
  const newUser = new User({ username, email, password });

  // Hash the user's password before saving it to the database
  newUser.password = await bcrypt.hash(password, 10);

  // Save the user to the database
  await newUser.save();

  res.status(201).json({ message: 'User registered successfully' });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }

});

// Route for user login
router.post('/login', async (req, res) => {
  try {
    
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If the user is not found, return an error
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // Respond with the token
    res.json({ token });

    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
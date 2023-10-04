const User = require('../models/User');
const jwt = require('jsonwebtoken');



const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'Authentication failed. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed. User not found.' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Authentication failed. Invalid token.' });
  }
};

module.exports = { authenticateUser };
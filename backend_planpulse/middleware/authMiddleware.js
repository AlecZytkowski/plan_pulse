const User = require('../models/User');
const jwt = require('jsonwebtoken');



const authenticateUser = async (req, res, next) => {
  try {

    //Passes user's JWT Token for authorization.
    const token = req.header('Authorization');

    //If there is no token, set failed response status.
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed. No token provided.' });
    }

    //Set variable to decoded JWT token, using JWT Verification.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //Decode the UserID and sets the variable to the given value.
    const user = await User.findById(decoded.userId);

    //If user cannot be found, give an error.
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
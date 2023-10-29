const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticateUser } = require('../middleware/authMiddleware');

//Look into adding 404 error routing!

//Route for user's registration.
router.post('/register', async (req, res) => {
  try {
    
  //Passes the filled out user's username, email, and password in the body of the POST request when a request is recieved at the registration route.
  const { username, email, password } = req.body;

  //Check if the user with the provided email already exists.
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User with this email already exists' });
  }



  //Create a new user.
  const newUser = new User({ username, email, password });

  //Hash the password before saving it to the database.
  newUser.password = await bcrypt.hash(password, 10);

  //Save the user to the database.
  await newUser.save();

  //Alert user of successful registration.
  res.status(201).json({ message: 'User registered successfully' });
} catch (error) {
  //Log and alert error if there is an error during registration.
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }

});



//Route for user's login.
router.post('/login', async (req, res) => {
  try {
    
    //Passes the filled out user's email, and password in the body of the POST request when a request is recieved at the login route.
    const { email, password } = req.body;

    //Find the user by email
    const user = await User.findOne({ email });

    //If the user is not found, return an error
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    //Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    //Generate a JWT token for the authenticated user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    //Respond with the token
    res.json({ token });

    } catch (error) {

    //Log and alert user of error during login.
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


/*IMPLEMENT THIS ROUTE WHEN ALLOWING FRIENDS/USER SEARCH*/
// Route for user search (Currently un-unused route.)
router.post('/search', async (req, res) => {
  try {
    
    const { email, username } = req.body;

    // Find the user by email
    const user = await User.findOne({ $or: [{ email }, { username }] });

    // If the user or email is not found, return an error
    if (!user) {
      return res.status(404).json({ message: 'User Not Found!' });
    }

    // If the user or email found, return user. Excluding password also.
    const { password, ...userWithoutPassword } = user.toObject();

    return res.status(200).json(userWithoutPassword);

    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


//Route for retreiving user profile
router.get('/profile', authenticateUser, async (req, res) => {
  try {

    //Fetch the user's information if currently logged in.
    const user = req.user;

    //Remove password from the response.
    const userProfile = {
      _id: user._id,
      username: user.username,
      email: user.email,
      userImageUrl: user.userImageUrl
    };

    //Provide userProfile information for visibility if successful.
    res.status(200).json({ user: userProfile });
  } catch (error) {
    //Give error if there is an issue in retrieving user's profile information.
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



//Route for updating the user's profile
router.put('/profile', authenticateUser, async (req, res) => {

  try {
    //Pass the user's username and image in the body of the PUT request.
    const { username, userImageUrl } = req.body;

    //Fetch the user's profile based on the authenticated user.
    const user = req.user;

    //Validate and update the user's profile data. Do not allow usernames less than 3 characters.
    if (username && username.length < 3) {
      return res.status(400).json({ message: 'Username must be at least 3 characters long' });
    }

    //Update the user's profile data, including username and to the URL of their select profile picture.
    if (username) {
      user.username = username;
    }
    if (userImageUrl) {
      user.userImageUrl = userImageUrl;
    }

    //Save the user's profile once the information is retrieved.
    await user.save();

    //Return a success message or error
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {

    //Return an error if unsuccessful.
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


/*CURRENTLY UNUSED ROUTE FOR DELETING THE USER'S PROFILE. ADD IMPLEMENTATION IN UserProfile Component.*/
//Route for deleting a user's profile.
router.delete('/profile', authenticateUser, async (req, res) => {
  try {
    //Pass the user user information and password to the backend during deletion.
    const user = req.user;
    const { password } = req.body;
    
    //Confirm user password
    if (!password) {
      return res.status(400).json({ message: 'Please provide your password for confirmation' });
    }
    
    //Check if password is valid, if not throw Invalid Password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid Password'})
    }

    //Confirm deletion
    await User.findByIdAndDelete(user._id);
    res.status(200).json({ message: 'Profile deleted successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;
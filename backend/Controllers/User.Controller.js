const UserModel = require('../Models/User.Model');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');





const register = async (req, res) => {
  console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { username, fullname, email, password } = req.body;
        console.log(req.body, 'req.body');
      // Check if the user already exists
      let user = await UserModel.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      // Create a new user
      user = new UserModel({
        username,
        fullname,
        email,
        password,
      });
  
      // Encrypt the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      // Save the user to the database
      await user.save();
  
      res.json({ msg: 'User registered successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  };
//  login function

const login = async (req, res) => {
  try {
      const { email, password } = req.body;
      console.log(email);
      let user = await UserModel.findOne({ email: email  });
      console.log(user);
      if (!user) {
          return res.status(400).json({ msg: 'create a new accounte 😻',  });
      }

      // Compare the plaintext password with the hashed password stored in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ msg: 'Invalid password' });
      }

      res.json({ msg: 'Login successful' , user });
  } catch (error) {
      console.error(error);
      res.status(500).send({ msg: 'Server error', error: error.message });
  }
};


// get all users  :
const getAllUsers = async (req, res) => {
  try {
      // Fetch all users from the database
      const users = await UserModel.find();
      
      // Return the list of users
      res.json({ users });
  } catch (error) {
      console.error(error);
      res.status(500).send({ msg: 'Server error', error: error.message });
  }
};

module.exports = { register, login, getAllUsers };














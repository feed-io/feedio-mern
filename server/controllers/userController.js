// controllers/userController.js
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.loginUser = (req, res) => {
  // Implement your login logic here
};

exports.getAllUsers = (req, res) => {
  // Implement logic to fetch all users
};

exports.getUserById = (req, res) => {
  // Implement logic to fetch a user by ID
};

exports.updateUser = (req, res) => {
  // Implement logic to update a user
};

exports.deleteUser = (req, res) => {
  // Implement logic to delete a user
};

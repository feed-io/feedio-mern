const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const User = require("../models/user");

dotenv.config();

exports.registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    let token;
    try {
      token = jwt.sign(
        { userId: newUser._id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
    res.status(201).json({ userId: newUser._id, email: newUser.email, token });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // You now have access to the user's ID through existingUser._id
    const userId = existingUser._id;

    // Here, you can generate and send a token, or simply send the user data back to the client
    // For demonstration purposes, we will just send the user data including the user ID
    res.status(200).json({ message: "Login successful", user: existingUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
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

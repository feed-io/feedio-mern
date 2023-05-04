const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const User = require("../models/user");
const Company = require("../models/company");

dotenv.config();

exports.registerUser = async (req, res, next) => {
  const { username, companyName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    let company = await Company.findOne({ name: companyName });

    // Create a new company if it doesn't exist (optional)
    if (!company) {
      company = new Company({ name: companyName });
      await company.save();
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      companyName: company._id,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    let token;
    try {
      token = jwt.sign(
        { userId: newUser._id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went ttoken", error: error });
    }
    res.status(201).json({ userId: newUser._id, email: newUser.email, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    let token;
    try {
      token = jwt.sign(
        { userId: existingUser._id, email: existingUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }

    // Here, you can generate and send a token, or simply send the user data back to the client
    // For demonstration purposes, we will just send the user data including the user ID
    res
      .status(200)
      .json({ userId: existingUser._id, email: existingUser.email, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserById = async (req, res) => {
  // Implement logic to fetch a user by ID
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = {
      userId: user._id,
      username: user.username,
      companyName: user.companyName,
    };

    res.status(200).json({ user: user });
  } catch (error) {}
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username) {
      user.username = username;
    }

    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({ message: "Email already in use" });
      }
      user.email = email;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      user.password = hashedPassword;
    }

    await user.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.deleteUser = (req, res) => {
  // Implement logic to delete a user
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const User = require("../models/user");
const Product = require("../models/Product");

dotenv.config();

exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name,
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
    res.status(201).json({
      userId: newUser._id,
      email: newUser.email,
      token,
      membershipStatus: newUser.membershipStatus,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email }).populate("products");

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

    res.status(200).json({
      userId: existingUser._id,
      email: existingUser.email,
      token,
      membershipStatus: existingUser.membershipStatus,
      products: existingUser.products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate("products");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = {
      userId: user._id,
      name: user.name,
      email: user.email,
      membershipStatus: user.membershipStatus,
      products: user.products,
    };

    res.status(200).json({ user: userData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching user data" });
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) {
      user.name = name;
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

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

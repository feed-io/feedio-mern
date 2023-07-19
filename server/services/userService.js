const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const sendEmail = require("../utils/email");
const User = require("../models/user");
const Product = require("../models/Product");
const Payment = require("../models/Payment");

dotenv.config();

const register = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = new User({
    email,
    password: hashedPassword,
  });
  await newUser.save();

  const token = jwt.sign(
    { userId: newUser._id, email: newUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  sendEmail({
    to: newUser.email,
    subject: "Welcome to Feedio",
    html: `<h1>Welcome to Feedio!</h1><p>Dear ${newUser.name},</p><p>Thank you for signing up for Feedio. We're excited to have you on board.</p>`,
  });

  return {
    userId: newUser._id,
    email: newUser.email,
    token,
    membershipStatus: newUser.membershipStatus,
  };
};

const login = async ({ email, password }) => {
  const existingUser = await User.findOne({ email }).populate("products");
  if (!existingUser) {
    throw new Error("User doesn't exist");
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    { userId: existingUser._id, email: existingUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    userId: existingUser._id,
    email: existingUser.email,
    token,
    membershipStatus: existingUser.membershipStatus,
    products: existingUser.products,
  };
};

const getById = async (id) => {
  const user = await User.findById(id).populate("products");
  if (!user) {
    throw new Error("User not found");
  }

  return {
    userId: user._id,
    email: user.email,
    membershipStatus: user.membershipStatus,
    products: user.products,
  };
};

const update = async ({ id, name, email, password }) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  if (email) {
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== id) {
      throw new Error("Email already in use");
    }
    user.email = email;
  }

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;

    sendEmail({
      to: user.email,
      subject: "Your Password Has Been Updated",
      html: `<h1>Your Password Has Been Updated</h1><p>Dear ${user.name},</p><p>Your password has been successfully updated. If you did not request this change, please contact support immediately.</p>`,
    });
  }

  await user.save();
  return { message: "User updated successfully" };
};

const deleteUser = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  await Product.deleteMany({ _id: { $in: user.products } });
  await Payment.deleteMany({ _id: { $in: user.payments } });
  await User.deleteOne({ _id: id });

  return { message: "User and associated data deleted successfully" };
};

module.exports = {
  register,
  login,
  getById,
  update,
  deleteUser,
};

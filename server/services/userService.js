const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const {
  sendAccountCreationEmail,
  sendAccountUpdateEmail,
} = require("../utils/email");
const User = require("../models/User");
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
    name,
    email,
    password: hashedPassword,
    notifyAccount: true,
    notifyReview: true,
  });
  await newUser.save();

  const token = jwt.sign(
    { userId: newUser._id, email: newUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  sendAccountCreationEmail({
    name: newUser.name,
    email: newUser.email,
    membershipStatus: newUser.membershipStatus,
  });

  return {
    userId: newUser._id,
    email: newUser.email,
    name: newUser.name,
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
    { expiresIn: "24h" }
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
    name: user.name,
    email: user.email,
    membershipStatus: user.membershipStatus,
    products: user.products,
    notifyAccount: user.notifyAccount,
    notifyReview: user.notifyReview,
  };
};

const update = async ({
  id,
  name,
  email,
  password,
  notifyAccount,
  notifyReview,
}) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  let emailUpdated = false;
  let passwordUpdated = false;

  if (name && name !== user.name) {
    user.name = name;
  }

  if (email && email !== user.email) {
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== id) {
      throw new Error("Email already in use");
    }
    user.email = email;
    emailUpdated = true;
  }

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    passwordUpdated = true;
  }

  if (typeof notifyAccount !== "undefined") {
    user.notifyAccount = notifyAccount;
  }
  if (typeof notifyReview !== "undefined") {
    user.notifyReview = notifyReview;
  }

  await user.save();

  if (user.notifyAccount) {
    sendAccountUpdateEmail(user, { emailUpdated, passwordUpdated });
  }

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

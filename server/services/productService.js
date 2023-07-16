const Product = require("../models/Product");
const User = require("../models/user");

const create = async ({
  name,
  imageUrl,
  header,
  content,
  questions,
  rating,
  userId,
}) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const newProduct = new Product({
    name,
    header,
    content,
    questions,
    rating,
    imageUrl,
    user: userId,
  });
  await newProduct.save();

  user.products.push(newProduct);
  await user.save();

  return newProduct;
};

const getAll = async (userId) => {
  const products = await Product.find({ user: userId });
  if (!products) {
    throw new Error("No products found");
  }
  return products;
};

const getById = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

const update = async ({
  productId,
  name,
  imageUrl,
  header,
  content,
  questions,
}) => {
  const product = await Product.findByIdAndUpdate(
    productId,
    { name, imageUrl, header, content, questions },
    { new: true }
  );

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

const deleteOne = async (productId, userId) => {
  const product = await Product.findByIdAndDelete(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { products: productId } },
    { new: true }
  );

  return "Product deleted successfully";
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteOne,
};

const Review = require("../models/Review");
const Product = require("../models/Product");
const Sentiment = require("sentiment");

const sentiment = new Sentiment();

const create = async ({ name, email, content, rating, productId }) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  const sentimentAnalysis = sentiment.analyze(content);

  const newReview = new Review({
    name,
    content,
    email,
    rating,
    sentiment: sentimentAnalysis.score,
    product: productId,
  });

  await newReview.save();

  product.reviews.push(newReview._id);
  await product.save();

  return newReview;
};

const getAll = async (productId) => {
  const product = await Product.findById(productId).populate("reviews");
  if (!product) {
    throw new Error("Product not found");
  }

  return product.reviews;
};

const deleteOne = async (reviewId) => {
  const review = await Review.findById(reviewId);
  if (!review) {
    throw new Error("Review not found");
  }

  const product = await Product.findById(review.product);
  if (!product) {
    throw new Error("Product not found");
  }

  const index = product.reviews.indexOf(reviewId);
  if (index > -1) {
    product.reviews.splice(index, 1);
  }

  await product.save();
  await Review.deleteOne({ _id: reviewId });

  return "Review deleted successfully";
};

module.exports = {
  create,
  getAll,
  deleteOne,
};

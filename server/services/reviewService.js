const Review = require("../models/Review");
const Product = require("../models/Product");
const Sentiment = require("sentiment");
const natural = require("natural");

const tokenizer = new natural.WordTokenizer();
const sentiment = new Sentiment();
const stemmer = natural.PorterStemmer;

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

const stopWords = [
  "and",
  "the",
  "is",
  "in",
  "it",
  "you",
  "of",
  "for",
  "to",
  "on",
  "that",
  "this",
  "with",
  "as",
  "was",
  "are",
  "be",
  "at",
  "or",
  "but",
  "not",
];

const generateWordFrequencies = (reviews) => {
  let wordCounts = {};
  reviews.forEach((review) => {
    const tokens = tokenizer
      .tokenize(review.content)
      .filter((word) => !stopWords.includes(word.toLowerCase()))
      .map((word) => stemmer.stem(word));

    tokens.forEach((token) => {
      wordCounts[token] = (wordCounts[token] || 0) + 1;
    });
  });

  return wordCounts;
};

const getWordCloudData = async (productId) => {
  console.log(productId);
  try {
    const reviews = await Review.find({ product: productId });

    const wordCounts = generateWordFrequencies(reviews);

    return wordCounts;
  } catch (err) {
    console.log(err);
    throw new Error("Review not found");
  }
};

module.exports = {
  create,
  getAll,
  deleteOne,
  getWordCloudData,
};

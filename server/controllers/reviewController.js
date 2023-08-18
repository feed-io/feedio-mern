const { validationResult } = require("express-validator");

const reviewService = require("../services/reviewService");

exports.createReview = async (req, res) => {
  const { name, email, content, rating, productId } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const newReview = await reviewService.create({
      name,
      email,
      content,
      rating,
      productId,
    });
    res
      .status(201)
      .json({ message: "Review created successfully", review: newReview });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

exports.createReviewForWidget = async (req, res) => {
  const { name, email, content, rating, productId } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const newReview = await reviewService.widgetReview({
      name,
      email,
      content,
      rating,
      productId,
    });
    res
      .status(201)
      .json({ message: "Review created successfully", review: newReview });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

exports.getAllReviews = async (req, res) => {
  const { pid } = req.params;

  try {
    const reviews = await reviewService.getAll(pid);

    res.status(200).json({ reviews: reviews });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

exports.getFavoriteReviews = async (req, res) => {
  try {
    const favReviews = await Review.find({ status: "fav" });
    res.status(200).json(favReviews);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteReview = async (req, res) => {
  const { rid } = req.params;

  try {
    const message = await reviewService.deleteOne(rid);
    res.status(200).json({ message: message });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

exports.getWordCloudData = async (req, res, next) => {
  const productId = req.mainParams.pid;

  try {
    const wordCounts = await reviewService.getWordCloudData(productId);
    res.status(200).json(wordCounts);
  } catch (err) {
    res.status(500).json({ error: "Server error", message: err.message });
  }
};

exports.getRatingsTrend = async (req, res) => {
  const productId = req.mainParams.pid;
  const granularity = req.query.granularity;
  try {
    const trends = await reviewService.getRatingsTrend(productId, granularity);

    res.status(200).json(trends);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

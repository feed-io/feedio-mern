const Review = require("../models/Review");
const Product = require("../models/Product");

exports.createReview = async (req, res) => {
  const { name, email, content, rating, productId } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const newReview = new Review({
      name,
      content,
      email,
      rating,
      product: productId,
    });

    await newReview.save();

    product.reviews.push(newReview._id);
    await product.save();

    res
      .status(201)
      .json({ message: "Review created successfully", review: newReview });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

exports.getAllReviews = async (req, res) => {
  const { pid } = req.params;

  try {
    const product = await Product.findById(pid).populate("reviews");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ reviews: product.reviews });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  const { rid } = req.params;

  try {
    const review = await Review.findById(rid);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    const product = await Product.findById(review.product);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const index = product.reviews.indexOf(rid);
    if (index > -1) {
      product.reviews.splice(index, 1);
    }

    await product.save();

    await Review.findByIdAndRemove(rid);

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

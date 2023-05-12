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

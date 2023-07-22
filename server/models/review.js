const mongoose = require("mongoose");
const Product = require("./Product");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, default: "" },
  content: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
});

// Middleware to calculate average rating and update rating distribution
const calculateAndUpdateProductStats = async function (next) {
  const review = this;

  const product = await Product.findById(review.product);

  if (!product) {
    throw new Error("Associated product not found");
  }

  // Fetch all reviews for the product, including the newly saved/updated one
  const reviews = await mongoose
    .model("Review")
    .find({ product: review.product });

  // Calculate total reviews
  product.totalReviews = reviews.length;

  // Reset rating distribution
  product.ratingDistribution = {
    oneStar: 0,
    twoStar: 0,
    threeStar: 0,
    fourStar: 0,
    fiveStar: 0,
  };

  // Calculate rating distribution and total stars for average
  let totalStars = 0;
  for (let r of reviews) {
    totalStars += r.rating;

    if (r.rating === 1) product.ratingDistribution.oneStar += 1;
    else if (r.rating === 2) product.ratingDistribution.twoStar += 1;
    else if (r.rating === 3) product.ratingDistribution.threeStar += 1;
    else if (r.rating === 4) product.ratingDistribution.fourStar += 1;
    else if (r.rating === 5) product.ratingDistribution.fiveStar += 1;
  }

  // Calculate average rating
  product.averageRating = totalStars / reviews.length || 0;

  await product.save();

  next();
};

reviewSchema.pre("save", function (next) {
  calculateAndUpdateProductStats.call(this, next);
});

reviewSchema.pre("remove", function (next) {
  calculateAndUpdateProductStats.call(this, next);
});

module.exports = mongoose.model("Review", reviewSchema);

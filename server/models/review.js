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
  sentiment: { type: Number },
});

const calculateAndUpdateProductStats = async function (next) {
  const review = this;

  const product = await Product.findById(review.product);

  if (!product) {
    throw new Error("Associated product not found");
  }

  const reviews = await mongoose
    .model("Review")
    .find({ product: review.product });

  if (reviews.length === 0) {
    product.totalReviews = 0;
    product.averageRating = 0;
    product.ratingDistribution = {
      oneStar: 0,
      twoStar: 0,
      threeStar: 0,
      fourStar: 0,
      fiveStar: 0,
    };
  } else {
    product.totalReviews = reviews.length;

    let totalStars = 0;
    for (let r of reviews) {
      totalStars += r.rating;

      if (r.rating === 1) product.ratingDistribution.oneStar += 1;
      else if (r.rating === 2) product.ratingDistribution.twoStar += 1;
      else if (r.rating === 3) product.ratingDistribution.threeStar += 1;
      else if (r.rating === 4) product.ratingDistribution.fourStar += 1;
      else if (r.rating === 5) product.ratingDistribution.fiveStar += 1;
    }

    product.averageRating = totalStars / reviews.length;
  }

  await product.save();

  next();
};

reviewSchema.pre("save", function (next) {
  calculateAndUpdateProductStats.call(this, next);
});

reviewSchema.pre("remove", function (next) {
  calculateAndUpdateProductStats.call(this, next);
});

module.exports = {
  Review: mongoose.model("Review", reviewSchema),
  calculateAndUpdateProductStats,
};

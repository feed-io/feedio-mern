const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  header: { type: String, required: true },
  content: { type: String, required: true },
  questions: { type: [String], required: true },
  imageUrl: { type: String, required: false },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review", required: true }],
  widgets: [{ type: Schema.Types.ObjectId, ref: "Widget" }],
  averageRating: { type: Number, default: 0 },
  ratingDistribution: {
    oneStar: { type: Number, default: 0 },
    twoStar: { type: Number, default: 0 },
    threeStar: { type: Number, default: 0 },
    fourStar: { type: Number, default: 0 },
    fiveStar: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model("Product", productSchema);

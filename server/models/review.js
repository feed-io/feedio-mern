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
  npsScore: {
    type: Number,
    min: 0,
    max: 10,
  },
});

module.exports = {
  Review: mongoose.model("Review", reviewSchema),
};

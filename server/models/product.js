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
});

module.exports = mongoose.model("Product", productSchema);

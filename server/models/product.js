const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

module.exports = mongoose.model("Product", productSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

module.exports = mongoose.model("Product", productSchema);

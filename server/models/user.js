const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  payments: [{ type: Schema.Types.ObjectId, ref: "Payment" }],
});

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  notifyReview: { type: Boolean },
  notifyAccount: { type: Boolean },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  payments: [{ type: Schema.Types.ObjectId, ref: "Payment" }],
  membershipStatus: { type: String, default: "free" },
  stripeSubscriptionId: { type: String },
  stripeCustomerId: { type: String },
});

module.exports = mongoose.model("User", userSchema);
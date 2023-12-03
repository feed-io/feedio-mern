const mongoose = require("mongoose");

const npsSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  interactionDate: {
    type: Date,
    required: true,
  },
  followUp: {
    type: Boolean,
    default: false,
  },
  reason: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const NPS = mongoose.model("NPS", npsSchema);
module.exports = NPS;

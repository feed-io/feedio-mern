const mongoose = require("mongoose");

const npsSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  comment: {
    type: String,
    trim: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const NPS = mongoose.model("NPS", npsSchema);

module.exports = NPS;

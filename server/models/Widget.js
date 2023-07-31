const mongoose = require("mongoose");

const widgetSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    type: {
      type: String,
      enum: ["masonry_scroll", "masonry_fix", "carousel", "collect-feedback"],
      required: true,
    },
    scrollSpeed: {
      type: Number,
      type: Number,
    },
    hideDate: {
      type: Boolean,
      default: false,
    },
    autoScroll: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Widget = mongoose.model("Widget", widgetSchema);

module.exports = Widget;
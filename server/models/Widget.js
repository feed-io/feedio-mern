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
      enum: ["masonry_scroll", "masonry_fix", "carousel"],
      required: true,
    },
    scrollSpeed: {
      type: Number,
      required: function () {
        return this.type === "masonry_scroll";
      },
    },
    showDate: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Widget = mongoose.model("Widget", widgetSchema);

module.exports = Widget;

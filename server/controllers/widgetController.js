const reviewService = require("../services/reviewService");
const Widget = require("../models/widgetModel"); // Assume you have a widgetModel

exports.generateWidget = async (req, res, next) => {
  const userId = req.params.id;
  const productId = req.params.pid;
  const widgetConfig = req.body;

  try {
    let widget = await Widget.findOne({ user: userId, product: productId });

    if (widget) {
      widget.config = widgetConfig;
      await widget.save();
    } else {
      widget = new Widget({
        user: userId,
        product: productId,
        config: widgetConfig,
      });
      await widget.save();
    }

    res
      .status(200)
      .json({ message: "Widget configuration saved successfully.", widget });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving widget configuration.", error });
  }
};

exports.getWidget = async (req, res, next) => {
  const userId = req.params.userId;
  const productId = req.params.productId;

  try {
    const widget = await Widget.findOne({ user: userId, product: productId });

    if (!widget) {
      return res
        .status(404)
        .json({
          message:
            "No widget configuration found for the specified user and product.",
        });
    }

    res.status(200).json({ widget });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching widget configuration.", error });
  }
};

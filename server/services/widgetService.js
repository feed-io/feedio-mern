const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

const Widget = require("../models/Widget");
const Review = require("../models/Review");

const generateWidgetConfig = async (productId, widgetConfig, type) => {
  let widget = await Widget.findOne({
    product: productId,
    type: type,
  });

  if (widget) {
    widget.config = widgetConfig;
    await widget.save();
  } else {
    widget = new Widget({
      product: productId,
      config: widgetConfig,
      type: type,
    });
    await widget.save();
  }

  return widget;
};

const getWidgetConfig = async (widgetId, productId) => {
  return await Widget.findOne({ _id: widgetId, product: productId });
};

const generateWidgetRepresentation = async (widgetConfig) => {
  let widgetRepresentation;
  let templatePath;
  let templateString;

  const reviews = await Review.find({ product: widgetConfig.product });

  switch (widgetConfig.type) {
    case "masonry_scroll":
      templatePath = path.join(__dirname, "../templates/masonry-scroll.hbs");
      break;
    case "masonry_fix":
      templatePath = path.join(__dirname, "../templates/masonry-fix.hbs");
      break;
    case "carousel":
      templatePath = path.join(__dirname, "../templates/carousel.hbs");
      break;
    default:
      throw new Error("Invalid widget type");
  }

  try {
    templateString = fs.readFileSync(templatePath, "utf-8");
    console.log(templateString);

    const template = handlebars.compile(templateString);
    console.log(template.toString());

    widgetRepresentation = template({ ...widgetConfig, reviews });
  } catch (error) {
    console.error("Error compiling the Handlebars template:", error);
  }

  return widgetRepresentation;
};

module.exports = {
  generateWidgetConfig,
  getWidgetConfig,
  generateWidgetRepresentation,
};

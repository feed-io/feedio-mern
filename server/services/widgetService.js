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
  let scriptPath;
  let stylePath;

  const reviews = await Review.find({ product: widgetConfig.product });

  const reviewsData = reviews.map((review) => ({
    name: review.name,
    content: review.content,
    rating: review.rating,
    createdAt: review.createdAt,
  }));

  switch (widgetConfig.type) {
    case "masonry_scroll":
      templatePath = path.join(
        __dirname,
        "../public/templates/masonry-scroll.hbs"
      );
      stylePath = path.join(__dirname, "../public/styles/masonry-scroll.css");
      scriptPath = path.join(__dirname, "../public/scripts/autoScroll.js");
      break;

    case "masonry_fix":
      templatePath = path.join(__dirname, "../templates/masonry-fix.hbs");
      stylePath = path.join(__dirname, "../styles/masonry-fix.css");
      scriptPath = path.join(__dirname, "../scripts/masonry-fix.js");
      break;

    case "carousel":
      templatePath = path.join(__dirname, "../templates/carousel.hbs");
      stylePath = path.join(__dirname, "../styles/carousel.css");
      scriptPath = path.join(__dirname, "../scripts/carousel.js");
      break;

    default:
      throw new Error("Invalid widget type");
  }

  handlebars.registerHelper("repeat", function (n, value) {
    let ret = "";
    let i = 0;

    if (arguments.length === 3) {
      i = value;
      n = n - value;
    }

    return ret;
  });

  try {
    templateString = fs.readFileSync(templatePath, "utf-8");
    const template = handlebars.compile(templateString);

    const styleContent = fs.readFileSync(stylePath, "utf-8");
    const scriptContent = fs.readFileSync(scriptPath, "utf-8");
    console.log(reviewsData);
    widgetRepresentation = template({ ...widgetConfig, reviewsData });

    widgetRepresentation += `<style>${styleContent}</style>`;
    widgetRepresentation += `<script>${scriptContent}</script>`;
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

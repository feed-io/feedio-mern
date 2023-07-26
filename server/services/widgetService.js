const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

const Widget = require("../models/Widget");
const Review = require("../models/Review");

const generateWidgetConfig = async (
  productId,
  scrollSpeed,
  hideDate,
  type,
  autoScroll
) => {
  let widget = await Widget.findOne({
    product: productId,
    type: type,
  });

  if (widget) {
    widget.scrollSpeed = scrollSpeed;
    widget.hideDate = hideDate;
    widget.type = type;
    widget.autoScroll = autoScroll;
  } else {
    widget = new Widget({
      product: productId,
      scrollSpeed: scrollSpeed,
      hideDate: hideDate,
      type: type,
      autoScroll: autoScroll,
    });
  }
  await widget.save();

  return widget;
};

const getWidgetConfig = async (widgetId, productId) => {
  return await Widget.findOne({ _id: widgetId, product: productId });
};

const generateWidgetRepresentation = async (
  productId,
  scrollSpeed,
  hideDate,
  type,
  autoScroll
) => {
  let widgetRepresentation;
  let templatePath;
  let templateString;
  let stylePath;

  const reviews = await Review.find({ product: productId });
  const reviewsData = reviews.map((review) => ({
    name: review.name,
    content: review.content,
    rating: review.rating,
    createdAt: new Date(review.createdAt).toDateString(),
  }));

  switch (type) {
    case "masonry_scroll":
      templatePath = path.join(
        __dirname,
        "../public/templates/masonry-scroll.hbs"
      );
      stylePath = path.join(__dirname, "../public/styles/masonry-scroll.css");

      break;

    case "masonry_fix":
      templatePath = path.join(
        __dirname,
        "../public/templates/masonry-fix.hbs"
      );
      stylePath = path.join(__dirname, "../public/styles/masonry-fix.css");

      break;

    case "carousel":
      templatePath = path.join(__dirname, "../public/templates/carousel.hbs");
      stylePath = path.join(__dirname, "../public/styles/carousel.css");
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
    console.log(hideDate);
    widgetRepresentation = template({
      reviewsData,
      hideDate,
      scrollSpeed: scrollSpeed || "1",
      autoScroll,
    });

    widgetRepresentation += `<style>${styleContent}</style>`;
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

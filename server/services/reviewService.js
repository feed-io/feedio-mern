const User = require("../models/user");
const Review = require("../models/review");
const Product = require("../models/product");
const { sendEmail, sendAdminNotificationEmail } = require("../utils/email");

const Sentiment = require("sentiment");
const natural = require("natural");
const mongoose = require("mongoose");

const tokenizer = new natural.WordTokenizer();
const sentiment = new Sentiment();
const stemmer = natural.PorterStemmer;

const create = async ({
  name,
  email,
  content,
  rating,
  productId,
  startDate,
  endDate,
}) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  const user = await User.findById(product.user);
  if (!user) {
    throw new Error("User not found");
  }
  console.log("date", startDate, endDate);
  const sentimentAnalysis = sentiment.analyze(content);

  const newReview = new Review({
    name,
    content,
    email,
    rating,
    sentiment: sentimentAnalysis.score,
    product: productId,
  });

  await newReview.save();

  product.reviews.push(newReview._id);
  await product.save();

  if (user.notifyReview) {
    sendAdminNotificationEmail({
      name: name,
      email: email,
      content: content,
      rating: rating,
      productName: product.name,
      userEmail: user.email,
    });
  }

  return newReview;
};

const widgetReview = async ({ name, email, content, rating, productId }) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  const user = await User.findById(product.user);
  if (!user) {
    throw new Error("User not found");
  }

  const sentimentAnalysis = sentiment.analyze(content);

  const newReview = new Review({
    name,
    content,
    email,
    rating,
    sentiment: sentimentAnalysis.score,
    product: productId,
  });

  await newReview.save();

  product.reviews.push(newReview._id);
  await product.save();

  sendEmail({
    to: user.email,
    subject: "New Review Added from Widget",
    html: `<h1>New Review for ${product.name} from Widget</h1>
           <p>${name} has added a review for ${product.name} using the widget.</p>
           <p>Rating: ${rating}</p>
           <p>Review: ${content}</p>`,
  });

  return newReview;
};

const getAll = async (productId) => {
  const product = await Product.findById(productId).populate("reviews");
  if (!product) {
    throw new Error("Product not found");
  }

  return product.reviews;
};

const deleteOne = async (reviewId) => {
  const review = await Review.findById(reviewId);
  if (!review) {
    throw new Error("Review not found");
  }

  const product = await Product.findById(review.product);
  if (!product) {
    throw new Error("Product not found");
  }

  const index = product.reviews.indexOf(reviewId);
  if (index > -1) {
    product.reviews.splice(index, 1);
  }

  await product.save();
  await Review.deleteOne({ _id: reviewId });

  return "Review deleted successfully";
};

const stopWords = [
  "and",
  "the",
  "is",
  "in",
  "it",
  "you",
  "of",
  "for",
  "to",
  "on",
  "that",
  "this",
  "with",
  "as",
  "was",
  "are",
  "be",
  "at",
  "or",
  "but",
  "not",
];

const generateWordFrequencies = (reviews) => {
  let wordCounts = {};
  reviews.forEach((review) => {
    const tokens = tokenizer
      .tokenize(review.content)
      .filter((word) => !stopWords.includes(word.toLowerCase()))
      .map((word) => stemmer.stem(word));

    tokens.forEach((token) => {
      wordCounts[token] = (wordCounts[token] || 0) + 1;
    });
  });

  return wordCounts;
};

const getWordCloudData = async (productId) => {
  try {
    const reviews = await Review.find({ product: productId });

    const wordCounts = generateWordFrequencies(reviews);

    return wordCounts;
  } catch (err) {
    throw new Error("Review not found");
  }
};

Date.prototype.getWeek = function () {
  const firstDayOfYear = new Date(this.getFullYear(), 0, 1);
  const pastDaysOfYear = (this - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

const getRatingsTrend = async (productId, granularity, startDate, endDate) => {
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  let start, end, trends, groupBy;

  switch (granularity) {
    case "daily":
      start = new Date(startDateObj);
      start.setHours(0, 0, 0, 0);

      end = new Date(endDateObj);
      end.setHours(23, 59, 59, 999);

      groupBy = "hour";
      trends = await getTrendsForPeriod(productId, start, end, groupBy);
      trends = fillGaps(trends, start, end, granularity);
      break;

    case "weekly":
      start = new Date(startDateObj);
      start.setDate(startDateObj.getDate() - startDateObj.getDay());

      end = new Date(endDateObj);
      end.setDate(endDateObj.getDate() + 6);

      groupBy = "dayOfWeek";
      trends = await getTrendsForPeriod(productId, start, end, groupBy);
      trends = fillGaps(trends, start, end, granularity);
      break;

    case "monthly":
      start = new Date(startDateObj.getFullYear(), startDateObj.getMonth(), 1);

      end = new Date(endDateObj.getFullYear(), endDateObj.getMonth() + 1, 0);

      groupBy = "dayOfMonth";
      trends = await getTrendsForPeriod(productId, start, end, groupBy);
      trends = fillGaps(trends, start, end, granularity);
      break;

    default:
      throw new Error("Invalid granularity");
  }

  console.log(trends);

  return trends;
};

// ... [rest of the functions and module exports]

const getTrendsForPeriod = async (productId, start, end, groupBy) => {
  try {
    const timezoneOffset = new Date().getTimezoneOffset();
    const offsetHours = timezoneOffset / 60;

    return await Review.aggregate([
      {
        $match: {
          product: new mongoose.Types.ObjectId(productId),
          createdAt: {
            $gte: start,
            $lte: end,
          },
        },
      },
      {
        $addFields: {
          localCreatedAt: {
            $subtract: ["$createdAt", offsetHours * 60 * 60 * 1000],
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$localCreatedAt" },
            month: { $month: "$localCreatedAt" },
            day: { $dayOfMonth: "$localCreatedAt" },
            [groupBy]: { [`$${groupBy}`]: "$localCreatedAt" },
          },
          averageRating: { $avg: "$rating" },
          highestRating: { $max: "$rating" },
          lowestRating: { $min: "$rating" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.day": 1,
          [`_id.${groupBy}`]: 1,
        },
      },
    ]);
  } catch (err) {
    console.error("Error during aggregation: ", err.message);
    throw new Error("Unable to fetch ratings trend");
  }
};

const fillGaps = (trends, start, end, granularity) => {
  const filledTrends = [];
  let current = new Date(start);

  switch (granularity) {
    case "daily":
      for (let hour = 0; hour < 24; hour++) {
        const trendForHour = trends.find((t) => t._id.hour === hour);
        if (trendForHour) {
          filledTrends.push(trendForHour);
        } else {
          filledTrends.push(createDefaultTrend(current, granularity, hour));
        }
      }
      break;

    case "weekly":
    case "monthly":
      while (current <= end) {
        const trendForDay = trends.find((t) => t._id.day === current.getDate());
        if (trendForDay) {
          filledTrends.push(trendForDay);
        } else {
          filledTrends.push(createDefaultTrend(current, granularity));
        }
        current.setDate(current.getDate() + 1);
      }
      break;
  }

  return filledTrends;
};

const createDefaultTrend = (date, granularity, hour = null) => {
  const defaultTrend = {
    _id: {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    },
    averageRating: null,
    highestRating: null,
    lowestRating: null,
    count: 0,
  };

  if (granularity === "daily") {
    defaultTrend._id.hour = hour;
  }

  return defaultTrend;
};

module.exports = {
  create,
  widgetReview,
  getAll,
  deleteOne,
  getWordCloudData,
  getRatingsTrend,
};

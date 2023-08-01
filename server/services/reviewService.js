const User = require("../models/user");
const Review = require("../models/Review");
const Product = require("../models/Product");
const { sendEmail, sendAdminNotificationEmail } = require("../utils/email");

const Sentiment = require("sentiment");
const natural = require("natural");
const mongoose = require("mongoose");

const tokenizer = new natural.WordTokenizer();
const sentiment = new Sentiment();
const stemmer = natural.PorterStemmer;

const create = async ({ name, email, content, rating, productId }) => {
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

  console.log(product);
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

function getISOWeek(date) {
  const jan4 = new Date(date.getFullYear(), 0, 4);
  return Math.ceil(((date - jan4) / 86400000 + jan4.getDay() + 1) / 7);
}

const getRatingsTrend = async (productId, granularity = "monthly") => {
  let groupBy = {};

  if (granularity === "yearly") {
    groupBy = {
      month: { $month: "$createdAt" },
      year: { $year: "$createdAt" },
    };
  } else if (granularity === "weekly") {
    groupBy = {
      dayOfWeek: { $dayOfWeek: "$createdAt" },
      week: { $isoWeek: "$createdAt" },
      year: { $isoWeekYear: "$createdAt" },
    };
  } else {
    groupBy = {
      dayOfMonth: { $dayOfMonth: "$createdAt" },
      month: { $month: "$createdAt" },
      year: { $year: "$createdAt" },
    };
  }

  try {
    const trends = await Review.aggregate([
      { $match: { product: new mongoose.Types.ObjectId(productId) } },
      { $project: { rating: 1, createdAt: 1 } },
      {
        $group: {
          _id: groupBy,
          averageRating: { $avg: "$rating" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.week": 1 } },
    ]);

    if (granularity === "weekly") {
      let filledData = [];
      const currentDay = new Date().getDay();
      for (let i = 1; i <= currentDay; i++) {
        const dataForDay = trends.find((item) => item._id.dayOfWeek === i);
        if (dataForDay) {
          filledData.push(dataForDay);
        } else {
          filledData.push({
            _id: {
              dayOfWeek: i,
              week: getISOWeek(new Date()),
              year: new Date().getFullYear(),
            },
            averageRating: 0,
            count: 0,
          });
        }
      }

      return filledData;
    } else if (granularity === "monthly") {
      let filledData = [];
      const daysInMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      ).getDate();
      for (let i = 1; i <= daysInMonth; i++) {
        const dataForDay = trends.find((item) => item._id.dayOfMonth === i);
        if (dataForDay) {
          filledData.push(dataForDay);
        } else {
          filledData.push({
            _id: {
              dayOfMonth: i,
              month: new Date().getMonth() + 1,
              year: new Date().getFullYear(),
            },
            averageRating: 0,
            count: 0,
          });
        }
      }
      return filledData;
    } else if (granularity === "yearly") {
      let filledData = [];
      for (let i = 1; i <= 12; i++) {
        const dataForMonth = trends.find((item) => item._id.month === i);
        if (dataForMonth) {
          filledData.push(dataForMonth);
        } else {
          filledData.push({
            _id: { month: i, year: new Date().getFullYear() },
            averageRating: 0,
            count: 0,
          });
        }
      }
      return filledData;
    }

    return trends;
  } catch (err) {
    console.error("Error during aggregation: ", err.message);
    throw new Error("Unable to fetch ratings trend");
  }
};

module.exports = {
  create,
  widgetReview,
  getAll,
  deleteOne,
  getWordCloudData,
  getRatingsTrend,
};

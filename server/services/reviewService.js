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

const getQuarterDates = (date) => {
  const year = date.getFullYear();
  const quarter = Math.floor(date.getMonth() / 3 + 1);

  switch (quarter) {
    case 1: // Q1
      return [new Date(year, 0, 1), new Date(year, 2, 31)];
    case 2: // Q2
      return [new Date(year, 3, 1), new Date(year, 5, 30)];
    case 3: // Q3
      return [new Date(year, 6, 1), new Date(year, 8, 30)];
    case 4: // Q4
      return [new Date(year, 9, 1), new Date(year, 11, 31)];
    default:
      throw new Error("Invalid quarter");
  }
};

const getRatingsTrend = async (productId) => {
  const currentDate = new Date();
  const timezoneOffset = currentDate.getTimezoneOffset() * 60000;

  // For the month
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  startOfMonth.setTime(startOfMonth.getTime() - timezoneOffset);

  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  endOfMonth.setTime(endOfMonth.getTime() - timezoneOffset);

  // For the week
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
  startOfWeek.setTime(startOfWeek.getTime() - timezoneOffset);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setTime(endOfWeek.getTime() - timezoneOffset);

  // For the day
  const startOfDay = new Date(currentDate);
  startOfDay.setHours(0, 0, 0, 0);
  startOfDay.setTime(startOfDay.getTime() - timezoneOffset);

  const endOfDay = new Date(currentDate);
  endOfDay.setHours(23, 59, 59, 999);
  endOfDay.setTime(endOfDay.getTime() - timezoneOffset);

  // For the quarter
  const [startOfQuarter, endOfQuarter] = getQuarterDates(currentDate);
  startOfQuarter.setTime(startOfQuarter.getTime() - timezoneOffset);
  endOfQuarter.setTime(endOfQuarter.getTime() - timezoneOffset);

  try {
    const monthlyTrends = await Review.aggregate([
      {
        $match: {
          product: new mongoose.Types.ObjectId(productId),
          createdAt: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
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
        },
      },
    ]);

    const weeklyTrends = await Review.aggregate([
      {
        $match: {
          product: new mongoose.Types.ObjectId(productId),
          createdAt: {
            $gte: startOfWeek,
            $lte: endOfWeek,
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfWeek: "$createdAt" },
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
        },
      },
    ]);

    const dailyTrends = await Review.aggregate([
      {
        $match: {
          product: new mongoose.Types.ObjectId(productId),
          createdAt: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
            hour: { $hour: "$createdAt" },
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
          "_id.hour": 1,
        },
      },
    ]);

    const quarterlyTrends = await Review.aggregate([
      {
        $match: {
          product: new mongoose.Types.ObjectId(productId),
          createdAt: {
            $gte: startOfQuarter,
            $lte: endOfQuarter,
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
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
        },
      },
    ]);

    // Fill gaps for days with no reviews for the month
    const filledMonthlyTrends = [];
    for (let day = 1; day <= endOfMonth.getDate(); day++) {
      const trendForDay = monthlyTrends.find((t) => t._id.day === day);
      if (trendForDay) {
        filledMonthlyTrends.push(trendForDay);
      } else {
        filledMonthlyTrends.push({
          _id: {
            year: currentDate.getFullYear(),
            month: currentDate.getMonth() + 1, // Months are 0-based
            day,
          },
          averageRating: null,
          highestRating: null,
          lowestRating: null,
          count: 0,
        });
      }
    }

    // Fill gaps for days with no reviews for the week
    const filledWeeklyTrends = [];
    for (let day = 1; day <= 7; day++) {
      const trendForDay = weeklyTrends.find((t) => t._id.day === day);
      if (trendForDay) {
        filledWeeklyTrends.push(trendForDay);
      } else {
        filledWeeklyTrends.push({
          _id: {
            year: currentDate.getFullYear(),
            month: currentDate.getMonth() + 1, // Months are 0-based
            day: day, // Day of the week (1-7)
          },
          averageRating: null,
          highestRating: null,
          lowestRating: null,
          count: 0,
        });
      }
    }

    // Fill gaps for hours with no reviews for the day
    const filledDailyTrends = [];
    for (let hour = 0; hour < 24; hour++) {
      const trendForHour = dailyTrends.find((t) => t._id.hour === hour);
      if (trendForHour) {
        filledDailyTrends.push(trendForHour);
      } else {
        filledDailyTrends.push({
          _id: {
            year: currentDate.getFullYear(),
            month: currentDate.getMonth() + 1, // Months are 0-based
            day: currentDate.getDate(),
            hour,
          },
          averageRating: null,
          highestRating: null,
          lowestRating: null,
          count: 0,
        });
      }
    }

    // Fill gaps for days with no reviews for the quarter
    const filledQuarterlyTrends = [];
    let current = new Date(startOfQuarter);
    while (current <= endOfQuarter) {
      const trendForDay = quarterlyTrends.find(
        (t) =>
          t._id.day === current.getDate() &&
          t._id.month === current.getMonth() + 1
      );
      if (trendForDay) {
        filledQuarterlyTrends.push(trendForDay);
      } else {
        filledQuarterlyTrends.push({
          _id: {
            year: current.getFullYear(),
            month: current.getMonth() + 1, // Months are 0-based
            day: current.getDate(),
          },
          averageRating: null,
          highestRating: null,
          lowestRating: null,
          count: 0,
        });
      }
      current.setDate(current.getDate() + 1); // Move to the next day
    }

    console.log({
      monthly: filledMonthlyTrends,
      weekly: filledWeeklyTrends,
      daily: filledDailyTrends,
      quarterly: filledQuarterlyTrends,
    });

    return {
      daily: filledDailyTrends,
      monthly: filledMonthlyTrends,
      weekly: filledWeeklyTrends,
      quarterly: filledQuarterlyTrends,
    };
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

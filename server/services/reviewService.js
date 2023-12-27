const User = require("../models/user");
const { Review } = require("../models/review");
const Product = require("../models/Product");
// const { sendEmail, sendAdminNotificationEmail } = require("../utils/email");

const mongoose = require("mongoose");
const Sentiment = require("sentiment");
const natural = require("natural");

const tokenizer = new natural.AggressiveTokenizer();
const sentiment = new Sentiment();
const WordNet = require("natural").WordNet;
const wordnet = new WordNet();

const recalculateAndUpdateNps = async (productId) => {
  const reviews = await Review.find({ product: productId });
  let promoters = 0,
    passives = 0,
    detractors = 0;

  reviews.forEach((review) => {
    if (review.npsScore >= 9) promoters++;
    else if (review.npsScore >= 7 && review.npsScore <= 8) passives++;
    else if (review.npsScore <= 6) detractors++;
  });

  const totalResponses = promoters + passives + detractors;
  const nps =
    totalResponses === 0
      ? 0
      : ((promoters - detractors) / totalResponses) * 100;

  await Product.findByIdAndUpdate(productId, {
    npsScore: nps,
    promotersCount: promoters,
    passivesCount: passives,
    detractorsCount: detractors,
  });
};

const recalculateAndUpdateRatingDistribution = async (productId) => {
  const reviews = await Review.find({ product: productId });

  let ratingDistribution = {
    oneStar: 0,
    twoStar: 0,
    threeStar: 0,
    fourStar: 0,
    fiveStar: 0,
  };

  const ratingMap = {
    1: "oneStar",
    2: "twoStar",
    3: "threeStar",
    4: "fourStar",
    5: "fiveStar",
  };

  reviews.forEach((review) => {
    const ratingKey = ratingMap[review.rating];
    if (ratingKey) {
      ratingDistribution[ratingKey]++;
    }
  });

  await Product.findByIdAndUpdate(productId, {
    ratingDistribution: ratingDistribution,
  });
};

const create = async ({
  name,
  email,
  content,
  rating,
  productId,
  npsScore,
  // startDate,
  // endDate,
}) => {
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
    npsScore: npsScore,
    sentiment: sentimentAnalysis.score,
    product: productId,
  });

  await newReview.save();

  product.reviews.push(newReview._id);
  await recalculateAndUpdateNps(productId);
  await recalculateAndUpdateRatingDistribution(productId);
  await product.save();

  // if (user.notifyReview) {
  //   sendAdminNotificationEmail({
  //     name: name,
  //     email: email,
  //     content: content,
  //     rating: rating,
  //     productName: product.name,
  //     userEmail: user.email,
  //   });
  // }

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

  // sendEmail({
  //   to: user.email,
  //   subject: "New Review Added from Widget",
  //   html: `<h1>New Review for ${product.name} from Widget</h1>
  //          <p>${name} has added a review for ${product.name} using the widget.</p>
  //          <p>Rating: ${rating}</p>
  //          <p>Review: ${content}</p>`,
  // });

  return newReview;
};

const getAll = async (productId, status = null) => {
  const product = await Product.findById(productId).populate("reviews");
  if (!product) {
    throw new Error("Product not found");
  }

  if (status !== null) {
    return product.reviews.filter((review) => review.status === status);
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

  await calculateAndUpdateProductStats.call(review);
  await recalculateAndUpdateNps(productId);
  await recalculateAndUpdateRatingDistribution(productId);
  await Review.deleteOne({ _id: reviewId });

  return "Review deleted successfully";
};

const updateFavoriteStatus = async (reviewId, newStatus) => {
  const review = await Review.findById(reviewId);
  if (!review) {
    throw new Error("Review not found");
  }

  review.status = newStatus;
  await review.save();

  return review;
};

const stopWords = [
  "a",
  "about",
  "above",
  "after",
  "again",
  "against",
  "all",
  "am",
  "an",
  "and",
  "any",
  "are",
  "aren't",
  "as",
  "at",
  "be",
  "because",
  "been",
  "before",
  "being",
  "below",
  "between",
  "both",
  "but",
  "by",
  "can't",
  "cannot",
  "could",
  "couldn't",
  "did",
  "didn't",
  "do",
  "does",
  "doesn't",
  "doing",
  "don't",
  "down",
  "during",
  "each",
  "few",
  "for",
  "from",
  "further",
  "had",
  "hadn't",
  "has",
  "hasn't",
  "have",
  "haven't",
  "having",
  "he",
  "he'd",
  "he'll",
  "he's",
  "her",
  "here",
  "here's",
  "hers",
  "herself",
  "him",
  "himself",
  "his",
  "how",
  "how's",
  "i",
  "i'd",
  "i'll",
  "i'm",
  "i've",
  "if",
  "in",
  "into",
  "is",
  "isn't",
  "it",
  "it's",
  "its",
  "itself",
  "let's",
  "me",
  "more",
  "most",
  "mustn't",
  "my",
  "myself",
  "no",
  "nor",
  "not",
  "of",
  "off",
  "on",
  "once",
  "only",
  "or",
  "other",
  "ought",
  "our",
  "ours",
  "ourselves",
  "out",
  "over",
  "own",
  "same",
  "shan't",
  "she",
  "she'd",
  "she'll",
  "she's",
  "should",
  "shouldn't",
  "so",
  "some",
  "such",
  "than",
  "that",
  "that's",
  "the",
  "their",
  "theirs",
  "them",
  "themselves",
  "then",
  "there",
  "there's",
  "these",
  "they",
  "they'd",
  "they'll",
  "they're",
  "they've",
  "this",
  "those",
  "through",
  "to",
  "too",
  "under",
  "until",
  "up",
  "very",
  "was",
  "wasn't",
  "we",
  "we'd",
  "we'll",
  "we're",
  "we've",
  "were",
  "weren't",
  "what",
  "what's",
  "when",
  "when's",
  "where",
  "where's",
  "which",
  "while",
  "who",
  "who's",
  "whom",
  "why",
  "why's",
  "with",
  "won't",
  "would",
  "wouldn't",
  "you",
  "you'd",
  "you'll",
  "you're",
  "you've",
  "your",
  "yours",
  "yourself",
  "yourselves",
];

const generateWordFrequencies = async (reviews) => {
  let wordCounts = {};
  let uniqueTokens = new Set();

  for (const review of reviews) {
    const tokens = tokenizer.tokenize(review.content);
    tokens.forEach((token) => {
      const lowerToken = token.toLowerCase();
      if (!stopWords.includes(lowerToken)) {
        uniqueTokens.add(lowerToken);
      }
    });
  }

  const lemmas = await batchLemmatize([...uniqueTokens]);

  for (const review of reviews) {
    const tokens = tokenizer.tokenize(review.content);
    tokens.forEach((token) => {
      const lowerToken = token.toLowerCase();
      const lemma = lemmas[lowerToken] || lowerToken;
      wordCounts[lemma] = (wordCounts[lemma] || 0) + 1;
    });
  }

  return wordCounts;
};

const batchLemmatize = async (tokens) => {
  const lemmaResults = {};
  const lemmaPromises = tokens.map((token) =>
    getLemma(token).then((lemma) => {
      lemmaResults[token] = lemma;
    })
  );

  await Promise.all(lemmaPromises);
  return lemmaResults;
};

let lemmaCache = {};

const getLemma = async (word) => {
  if (lemmaCache[word]) {
    return lemmaCache[word];
  }

  return new Promise((resolve, reject) => {
    wordnet.lookup(word, (results) => {
      const lemma = results.length > 0 ? results[0].lemma : word;
      lemmaCache[word] = lemma;
      resolve(lemma);
    });
  });
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

const getRatingsTrend = async (productId, startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  end.setHours(23, 59, 59, 999);

  const groupBy = "dayOfMonth";
  const trends = await getTrendsForPeriod(productId, start, end, groupBy);

  return fillGaps(trends, start, end);
};

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
        },
      },
    ]);
  } catch (err) {
    console.error("Error during aggregation: ", err.message);
    throw new Error("Unable to fetch ratings trend");
  }
};

const fillGaps = (trends, start, end) => {
  const filledTrends = [];
  let current = new Date(start);

  while (current <= end) {
    const trendForDay = trends.find((t) => t._id.day === current.getDate());
    if (trendForDay) {
      filledTrends.push(trendForDay);
    } else {
      filledTrends.push(createDefaultTrend(current));
    }
    current.setDate(current.getDate() + 1);
  }

  return filledTrends;
};

const createDefaultTrend = (date) => {
  return {
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
};

module.exports = {
  create,
  widgetReview,
  getAll,
  deleteOne,
  getWordCloudData,
  getRatingsTrend,
  updateFavoriteStatus,
};

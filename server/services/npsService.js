const mongoose = require("mongoose");

const NPS = require("../models/Nps");
const Product = require("../models/Product");

const calculateNPS = async (productId) => {
  const reviews = await NPS.find({ productId: productId });
  console.log(reviews);
  let promoters = 0;
  let detractors = 0;
  reviews.forEach((review) => {
    console.log(review);
    if (review.score >= 9) {
      promoters++;
    } else if (review.score <= 6) {
      detractors++;
    }
  });

  const totalResponses = reviews.length;
  const npsScore = ((promoters - detractors) / totalResponses) * 100;
  return Math.round(npsScore);
};

const addNpsScore = async (data) => {
  console.log(data);
  const newNpsData = new NPS(data);
  await newNpsData.save();
  return newNpsData;
};

const getNpsScoreDistribution = async (productId) => {
  try {
    const scores = await NPS.aggregate([
      { $match: { productId: new mongoose.Types.ObjectId(productId) } },
      { $group: { _id: "$score", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    let distribution = { promoters: 0, passives: 0, detractors: 0 };
    scores.forEach((item) => {
      if (item._id >= 9) distribution.promoters += item.count;
      else if (item._id >= 7) distribution.passives += item.count;
      else distribution.detractors += item.count;
    });

    return [
      distribution.promoters,
      distribution.passives,
      distribution.detractors,
    ];
  } catch (error) {
    console.error("Error in getNpsScoreDistribution:", error);
    throw error;
  }
};

const getResponseRate = async (productId, totalUsers) => {
  const totalResponses = await NPS.countDocuments({ productId: productId });
  return totalUsers ? (totalResponses / totalUsers) * 100 : 0;
};

// Get NPS trends over time
const getNpsTrends = async (productId, timeRange) => {
  // Implement logic to fetch and aggregate NPS scores over the specified timeRange
  // This might involve grouping data by month, quarter, etc., and calculating NPS for each group
};

// Calculate aggregated metrics for a product
const getProductMetrics = async (productId) => {
  // Implement logic to calculate average, median, etc., NPS scores for a product
  // Use MongoDB aggregation for efficiency
};

module.exports = {
  calculateNPS,
  addNpsScore,
  getNpsTrends,
  getProductMetrics,
  getNpsScoreDistribution,
  getResponseRate,
};

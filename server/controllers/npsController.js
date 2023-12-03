const npsService = require("../services/npsService");

exports.calculateNPS = async (req, res) => {
  try {
    const reviewData = req.body;
    await npsService.addNpsScore(reviewData);

    const npsScore = await npsService.calculateNPS(reviewData);
    res.status(200).json({ npsScore });
  } catch (error) {
    res.status(500).json({ message: "Error calculating NPS score", error });
  }
};

exports.submitNpsScore = async (req, res) => {
  const { productId, score, interactionDate } = req.body;

  // Basic input validation
  if (!productId || score === undefined || !interactionDate) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Further validation can be added as per your requirements

  try {
    const npsData = {
      productId,
      score,
      interactionDate: new Date(interactionDate),
    };

    const savedNpsData = await npsService.addNpsScore(npsData);
    res.status(201).json(savedNpsData);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error submitting NPS score", error: error.message });
  }
};

exports.getNPSTrends = async (req, res) => {
  try {
    const { productId, timeRange } = req.query;
    const trends = await npsService.getNpsTrends(productId, timeRange);
    res.status(200).json({ trends });
  } catch (error) {
    res.status(500).json({ message: "Error fetching NPS trends", error });
  }
};

exports.getProductMetrics = async (req, res) => {
  try {
    const productId = req.params.productId;
    const metrics = await npsService.getProductMetrics(productId);
    res.status(200).json({ metrics });
  } catch (error) {
    res.status(500).json({ message: "Error getting product metrics", error });
  }
};

exports.getNpsScoreDistribution = async (req, res) => {
  try {
    const productId = req.params.productId;
    const distribution = await npsService.getNpsScoreDistribution(productId);
    res.status(200).json({ distribution });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting NPS score distribution", error });
  }
};

exports.getResponseRate = async (req, res) => {
  try {
    const productId = req.params.productId;
    const totalUsers = req.body.totalUsers;
    const responseRate = await npsService.getResponseRate(
      productId,
      totalUsers
    );
    res.status(200).json({ responseRate });
  } catch (error) {
    res.status(500).json({ message: "Error getting response rate", error });
  }
};

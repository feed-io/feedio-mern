const Review = require("../models/review");
const npsService = require("../services/npsService");

exports.getNPSScore = async (req, res) => {
  try {
    const reviews = await Review.find();
    const npsScore = npsService.calculateNPS(reviews);

    res.status(200).json({ npsScore: Math.round(npsScore) });
  } catch (error) {
    res.status(500).json({ message: "Error fetching NPS score", error });
  }
};

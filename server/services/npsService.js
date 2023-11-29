// npsService.js

/**
 * Calculate the Net Promoter Score (NPS) more efficiently and flexibly.
 * NPS = [(Number of Promoters - Number of Detractors) / (Number of Respondents)] * 100
 * @param {Array} reviews - Array of review objects with a 'score' property.
 * @param {Object} scoreConfig - Configuration for score ranges.
 * @returns {Object} - An object containing the NPS score and distribution.
 */
const calculateNPS = (
  reviews,
  scoreConfig = { promoters: [9, 10], passives: [7, 8], detractors: [0, 6] }
) => {
  if (!Array.isArray(reviews)) {
    throw new Error("Invalid input: reviews should be an array.");
  }

  const scoreDistribution = { promoters: 0, passives: 0, detractors: 0 };

  reviews.forEach((review) => {
    if (!review.score && review.score !== 0) {
      throw new Error("Invalid review object: missing 'score' property.");
    }

    if (scoreConfig.promoters.includes(review.score)) {
      scoreDistribution.promoters++;
    } else if (scoreConfig.passives.includes(review.score)) {
      scoreDistribution.passives++;
    } else if (scoreConfig.detractors.includes(review.score)) {
      scoreDistribution.detractors++;
    }
  });

  const { promoters, detractors } = scoreDistribution;
  const totalRespondents = reviews.length;
  const npsScore =
    totalRespondents > 0
      ? ((promoters - detractors) / totalRespondents) * 100
      : 0;

  return {
    npsScore: Math.round(npsScore),
    distribution: scoreDistribution,
  };
};

module.exports = {
  calculateNPS,
};

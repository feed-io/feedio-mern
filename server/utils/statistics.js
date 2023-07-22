// const Review = require("../models/Review");
// const Product = require("../models/Product");

// export const updateProductStatistics = async (product) => {
//   const reviews = await Review.find({ product: product._id });

//   let totalReviews = reviews.length;
//   let sumRatings = 0;
//   let ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

//   reviews.forEach((review) => {
//     sumRatings += review.rating;
//     ratingDistribution[review.rating.toString()]++;
//   });

//   product.averageRating = sumRatings / totalReviews;
//   product.ratingDistribution = ratingDistribution;
//   product.totalReviews = totalReviews;

//   await product.save();
// };

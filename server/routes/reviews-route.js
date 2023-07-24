const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const reviewController = require("../controllers/reviewController");

router.get("/:pid/all", reviewController.getAllReviews);

router.post(
  "/createReview",
  [
    check("name").not().isEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Please enter a valid email"),
    check("content").not().isEmpty().withMessage("Content is required"),
    check("rating").isNumeric().withMessage("Rating must be a number"),
    check("productId").not().isEmpty().withMessage("Product ID is required"),
  ],
  reviewController.createReview
);

router.get("/favorites", reviewController.getFavoriteReviews);
router.get("/wordcloud", reviewController.getWordCloudData);
router.delete("/:rid", reviewController.deleteReview);

module.exports = router;

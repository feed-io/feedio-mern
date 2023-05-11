// routes/users.js
const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");
const checkAuth = require("../middleware/check-auth");

// router.use(checkAuth);
router.post("/createReview", reviewController.createReview);
// router.get("/all", reviewController.getAllProducts);
// router.get("/:pid", reviewController.getProductById);
// router.put("/:pid", reviewController.updateProduct);
// router.delete("/:pid", reviewController.deleteProduct);

module.exports = router;

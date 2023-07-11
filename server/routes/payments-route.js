const express = require("express");
const router = express.Router({ mergeParams: true });

const checkAuth = require("../middleware/check-auth");
const paymentController = require("../controllers/paymentController");

router.use(checkAuth);

router.post(
  "/create-checkout-session",
  paymentController.createCheckoutSession
);
router.post("/webhook", paymentController.handleStripeWebhook);

module.exports = router;

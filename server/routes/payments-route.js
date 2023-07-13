const express = require("express");
const router = express.Router({ mergeParams: true });

const checkAuth = require("../middleware/check-auth");
const paymentController = require("../controllers/paymentController");

router.use((req, res, next) => {
  if (req.path === "/webhook") {
    next();
  } else {
    checkAuth(req, res, next);
  }
});

router.post(
  "/create-checkout-session",
  paymentController.createCheckoutSession
);
router.post("/cancel-subscription", paymentController.cancelSubscription);
router.post("/webhook", paymentController.handleStripeWebhook);

module.exports = router;

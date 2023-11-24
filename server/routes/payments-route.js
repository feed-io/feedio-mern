const express = require("express");

const paymentController = require("../controllers/paymentController");

const router = express.Router({ mergeParams: true });

router.post(
  "/create-checkout-session",
  paymentController.createCheckoutSession
);
router.post(
  "/create-customer-portal-session",
  paymentController.createCustomerPortalSession
);
router.post("/cancel-subscription", paymentController.cancelSubscription);

router.post(
  "/webhook",
  // bodyParser.raw({ type: "application/json" }),
  paymentController.handleStripeWebhook
);

module.exports = router;

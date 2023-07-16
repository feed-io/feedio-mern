const express = require("express");

const checkAuth = require("../middleware/check-auth");
const paymentController = require("../controllers/paymentController");

const router = express.Router({ mergeParams: true });

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
router.post(
  "/create-customer-portal-session",
  paymentController.createCustomerPortalSession
);
router.post("/cancel-subscription", paymentController.cancelSubscription);

router.post("/webhook", paymentController.handleStripeWebhook);

module.exports = router;

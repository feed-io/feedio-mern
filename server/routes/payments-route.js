const express = require("express");
const router = express.Router({ mergeParams: true });

const paymentController = require("../controllers/paymentController");
const checkAuth = require("../middleware/check-auth");

router.use(checkAuth);
router.post("/", paymentController.createPayment);
// router.get("/", paymentController.getAllPayments);

module.exports = router;

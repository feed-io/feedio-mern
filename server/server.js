const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users-route");
const productRoutes = require("./routes/products-route");
const reviewRoutes = require("./routes/reviews-route");
const paymentRoutes = require("./routes/payments-route");
const paymentController = require("./controllers/paymentController");
const widgetRoutes = require("./routes/widget-route");
const checkAuth = require("./middleware/check-auth");

const app = express();
dotenv.config();

app.use(cors());

app.use(
  bodyParser.json({
    verify: function (req, res, buf) {
      req.rawBody = buf.toString();
    },
  })
);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

app.use("/static", express.static("public"));

app.use(checkAuth);

app.use("/api/users", userRoutes);

app.use("/api/users/:id/products", productRoutes);

app.use(
  "/api/users/:id/products/:pid/reviews",
  (req, res, next) => {
    req.mainParams = req.params;
    next();
  },
  reviewRoutes
);

app.use(
  "/api/users/:id/products/:pid/widgets",
  (req, res, next) => {
    req.mainParams = req.params;
    next();
  },
  widgetRoutes
);

app.use("/api/users/:id/payments", paymentRoutes);

app.post("/api/payments/webhook", paymentController.handleStripeWebhook);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

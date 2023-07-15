const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const userRoutes = require("./routes/users-route");
const productRoutes = require("./routes/products-route");
const reviewRoutes = require("./routes/reviews-route");
const paymentRoutes = require("./routes/payments-route");
const paymentController = require("./controllers/paymentController");

dotenv.config();

const app = express();

app.use(cors());

// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       connectSrc: [
//         "'self'",
//         "'unsafe-inline'",
//         "https://*.stripe.com",
//         "https://*.stripe.network",
//       ],
//       scriptSrc: [
//         "'self'",
//         "'unsafe-inline'",
//         "https://*.stripe.com",
//         "https://*.stripe.network",
//       ],
//       styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
//       fontSrc: ["'self'", "'unsafe-inline'", "https://fonts.gstatic.com"],
//       imgSrc: ["'self'", "'unsafe-inline'", "https://*.stripe.com"],
//       frameSrc: ["'self'", "'unsafe-inline'", "https://*.stripe.com"],
//     },
//   })
// );

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

app.use("/api/users", userRoutes);
app.use("/api/users/:id/products", productRoutes);
app.use("/api/users/:id/products/:pid/reviews", reviewRoutes);
app.use("/api/users/:id/payments", paymentRoutes);
app.post("/api/payments/webhook", paymentController.handleStripeWebhook);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
// const helmet = require("helmet");

const userRoutes = require("./routes/users-route");
const productRoutes = require("./routes/products-route");
const reviewRoutes = require("./routes/reviews-route");
const paymentRoutes = require("./routes/payments-route");
const paymentController = require("./controllers/paymentController");
const widgetRoutes = require("./routes/widget-route");

dotenv.config();

const app = express();

app.use(cors());

// const whitelist = ["http://localhost:3000"]; // replace with your frontend domain
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

// app.use(cors(corsOptions));

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
app.use("/api/users/:id/products/:pid/widgets", widgetRoutes);
app.use("/api/users/:id/payments", paymentRoutes);
app.post("/api/payments/webhook", paymentController.handleStripeWebhook);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

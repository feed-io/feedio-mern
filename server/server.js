const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const userRoutes = require("./routes/users-route");
const productRoutes = require("./routes/products-route");
const reviewRoutes = require("./routes/reviews-route");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/users", userRoutes);
app.use("/api/users/:id/products", productRoutes);
app.use("/api/users/:id/products/:pid/reviews", reviewRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const Product = require("./models/Product");
const User = require("./models/user");
const { Review } = require("./models/review");

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDateInCurrentMonth() {
  const date = new Date();
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const randomDay = getRandomIntInclusive(
    firstDayOfMonth.getDate(),
    lastDayOfMonth.getDate()
  );
  return new Date(date.getFullYear(), date.getMonth(), randomDay);
}

// MongoDB connection string
const url =
  "mongodb+srv://ramirezedluis:QY4YuT5WEUZPOZHw@cluster0.imzonx6.mongodb.net/feedio-local";

mongoose
  .connect(url)
  .then(() => {
    console.log("MongoDB Connected");
    seedDatabase();
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  });

async function seedDatabase() {
  try {
    // Fetch the existing user
    let user = await User.findOne({ name: "Luis" });
    if (!user) {
      console.error("User not found");
      return;
    }

    console.log("User fetched");

    // Generate and insert 3 products with reviews for the existing user
    for (let i = 0; i < 3; i++) {
      console.log(`Generating product ${i + 1}...`);
      let product = {
        _id: new mongoose.Types.ObjectId(),
        name: faker.commerce.productName(),
        header: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        questions: [
          faker.lorem.sentence(),
          faker.lorem.sentence(),
          faker.lorem.sentence(),
        ],
        user: user._id,
        reviews: [],
        averageRating: getRandomIntInclusive(1, 5),
        ratingDistribution: {
          oneStar: getRandomIntInclusive(0, 100),
          twoStar: getRandomIntInclusive(0, 100),
          threeStar: getRandomIntInclusive(0, 100),
          fourStar: getRandomIntInclusive(0, 100),
          fiveStar: getRandomIntInclusive(0, 100),
        },
        widgets: [],
        __v: getRandomIntInclusive(0, 10),
      };

      let createdProduct = await Product.create(product);
      console.log(`Product ${i + 1} inserted`);
      user.products.push(createdProduct._id);

      let numReviews = i === 0 ? 150 : i === 1 ? 50 : 0;

      for (let j = 0; j < numReviews; j++) {
        let review = {
          _id: new mongoose.Types.ObjectId(),
          product: createdProduct._id,
          name: faker.name.firstName(),
          email: faker.internet.email(),
          status: "fav",
          content: faker.lorem.paragraph(),
          rating: getRandomIntInclusive(1, 5),
          sentiment: getRandomIntInclusive(1, 5),
          createdAt: getRandomDateInCurrentMonth(),
          __v: getRandomIntInclusive(0, 10),
        };

        let createdReview = await Review.create(review);
        console.log("Review inserted");
        createdProduct.reviews.push(createdReview._id);
      }

      // Save the updated product document
      await createdProduct.save();
    }

    // Update the user document
    await user.save();
    console.log("User updated with new products");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    mongoose.disconnect();
    console.log("MongoDB Disconnected");
  }
}

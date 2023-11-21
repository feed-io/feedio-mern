// const { faker } = require("@faker-js/faker");
// const mongoose = require("mongoose");
// const Product = require("./models/Product");
// const User = require("./models/User");
// const { Review } = require("./models/review");

// function getRandomIntInclusive(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
// }

// // MongoDB connection string
// const url =
//   "mongodb+srv://ramirezedluis:sJXMs2auAiiRy77E@cluster0.imzonx6.mongodb.net/feedio-local";

// // Connect to MongoDB
// mongoose
//   .connect(url)
//   .then(() => {
//     console.log("MongoDB Connected");
//     seedDatabase();
//   })
//   .catch((err) => {
//     console.error("MongoDB Connection Error:", err);
//     process.exit(1); // Exit the script with an error code
//   });

// async function seedDatabase() {
//   try {
//     console.log("Generating user...");

//     // Generate 1 user
//     let user = {
//       _id: new mongoose.Types.ObjectId(),
//       name: faker.name.firstName(),
//       email: faker.internet.email(),
//       password: faker.internet.password(),
//       notifyReview: faker.datatype.boolean(),
//       notifyAccount: faker.datatype.boolean(),
//       products: [],
//       payments: [],
//       membershipStatus: "premium",
//       __v: Math.random({ min: 0, max: 10 }),
//     };
//     console.log("Done");
//     console.log(user);

//     // Generate and insert 3 products with reviews
//     for (let i = 0; i < 3; i++) {
//       console.log(`Generating product ${i + 1}...`);
//       let product = {
//         _id: new mongoose.Types.ObjectId(),
//         name: faker.commerce.productName(),
//         header: faker.lorem.sentence(),
//         content: faker.lorem.paragraph(),
//         questions: [
//           faker.lorem.sentence(),
//           faker.lorem.sentence(),
//           faker.lorem.sentence(),
//         ],
//         user: user._id,
//         reviews: [],
//         averageRating: getRandomIntInclusive(1, 5),
//         ratingDistribution: {
//           oneStar: getRandomIntInclusive(0, 100),
//           twoStar: getRandomIntInclusive(0, 100),
//           threeStar: getRandomIntInclusive(0, 100),
//           fourStar: getRandomIntInclusive(0, 100),
//           fiveStar: getRandomIntInclusive(0, 100),
//         },
//         widgets: [],
//         __v: Math.random({ min: 0, max: 10 }),
//       };

//       user.products.push(product._id);

//       // Insert the product into the database
//       await Product.create(product);
//       console.log(`Product ${i + 1} inserted`);

//       // Generate reviews for the product
//       console.log(`Generating reviews for product ${i + 1}...`);

//       let numReviews;
//       if (i === 0) {
//         numReviews = 150;
//       } else if (i === 1) {
//         numReviews = 50;
//       } else {
//         numReviews = 0;
//       }

//       for (let j = 0; j < numReviews; j++) {
//         let review = {
//           _id: new mongoose.Types.ObjectId(),
//           product: product._id,
//           name: faker.name.firstName(),
//           email: faker.internet.email(),
//           status: "fav",
//           content: faker.lorem.paragraph(),
//           rating: getRandomIntInclusive(1, 5),
//           sentiment: getRandomIntInclusive(1, 5),
//           createdAt: faker.date.past(),
//           __v: getRandomIntInclusive(1, 10),
//         };
//         console.log("Done");

//         // Add the review ID to the product's reviews array
//         product.reviews.push(review._id);

//         // Insert the review into the database
//         await Review.create(review);
//         console.log("Review inserted");
//       }
//     }

//     // Insert the user into the database
//     await User.create(user);
//     console.log("User inserted");
//   } catch (err) {
//     console.error("Error:", err);
//   } finally {
//     mongoose.disconnect();
//     console.log("MongoDB Disconnected");
//   }
// }

// const { faker } = require("@faker-js/faker");
// const mongoose = require("mongoose");
// const Product = require("./models/Product");
// const User = require("./models/User");
// const { Review } = require("./models/Review");

// function getRandomIntInclusive(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// // MongoDB connection string
// const url =
//   "mongodb+srv://ramirezedluis:sJXMs2auAiiRy77E@cluster0.imzonx6.mongodb.net/feedio-local";

// mongoose
//   .connect(url)
//   .then(() => {
//     console.log("MongoDB Connected");
//     seedDatabase();
//   })
//   .catch((err) => {
//     console.error("MongoDB Connection Error:", err);
//     process.exit(1);
//   });

// async function seedDatabase() {
//   try {
//     // Fetch the existing user
//     let user = await User.findOne({ name: "Luis" });
//     if (!user) {
//       console.error("User not found");
//       return;
//     }

//     console.log("User fetched");

//     // Generate and insert 3 products with reviews for the existing user
//     for (let i = 0; i < 3; i++) {
//       console.log(`Generating product ${i + 1}...`);
//       let product = {
//         _id: new mongoose.Types.ObjectId(),
//         name: faker.commerce.productName(),
//         header: faker.lorem.sentence(),
//         content: faker.lorem.paragraph(),
//         questions: [
//           faker.lorem.sentence(),
//           faker.lorem.sentence(),
//           faker.lorem.sentence(),
//         ],
//         user: user._id,
//         reviews: [],
//         averageRating: getRandomIntInclusive(1, 5),
//         ratingDistribution: {
//           oneStar: getRandomIntInclusive(0, 100),
//           twoStar: getRandomIntInclusive(0, 100),
//           threeStar: getRandomIntInclusive(0, 100),
//           fourStar: getRandomIntInclusive(0, 100),
//           fiveStar: getRandomIntInclusive(0, 100),
//         },
//         widgets: [],
//         __v: getRandomIntInclusive(0, 10),
//       };

//       await Product.create(product);
//       console.log(`Product ${i + 1} inserted`);
//       user.products.push(product._id);

//       let numReviews = i === 0 ? 150 : i === 1 ? 50 : 0;

//       for (let j = 0; j < numReviews; j++) {
//         let review = {
//           _id: new mongoose.Types.ObjectId(),
//           product: product._id,
//           name: faker.name.firstName(),
//           email: faker.internet.email(),
//           status: "fav",
//           content: faker.lorem.paragraph(),
//           rating: getRandomIntInclusive(1, 5),
//           sentiment: getRandomIntInclusive(1, 5),
//           createdAt: faker.date.past(),
//           __v: getRandomIntInclusive(0, 10),
//         };

//         await Review.create(review);
//         console.log("Review inserted");
//         product.reviews.push(review._id);
//       }
//     }

//     // Update the user document
//     await user.save();
//     console.log("User updated with new products");
//   } catch (err) {
//     console.error("Error:", err);
//   } finally {
//     mongoose.disconnect();
//     console.log("MongoDB Disconnected");
//   }
// }

const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const Product = require("./models/Product");
const User = require("./models/User");
const { Review } = require("./models/Review");

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// MongoDB connection string
const url =
  "mongodb+srv://ramirezedluis:sJXMs2auAiiRy77E@cluster0.imzonx6.mongodb.net/feedio-local";

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
          createdAt: faker.date.past(),
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

const Product = require("../models/Product");
const User = require("../models/user"); // Import User model

exports.createProduct = async (req, res) => {
  const { name, imageUrl } = req.body;
  const userId = req.userData.userId; // Assuming you have the user ID from an authentication middleware

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newProduct = new Product({
      name,
      imageUrl,
      user: userId, // Add this line
    });
    await newProduct.save();

    user.products.push(newProduct); // Add the product to the user's products
    await user.save();

    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  const { pid } = req.params;
  const { id } = req.userData.userId;

  try {
    const user = await User.findById(id);

    const product = await Product.findById(pid);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { id, pid } = req.params;
  const { name, imageUrl } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      pid,
      { name, imageUrl },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id, pid } = req.params;

  try {
    const product = await Product.findByIdAndDelete(pid);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

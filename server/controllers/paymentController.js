const Payment = require("../models/Payment");
const User = require("../models/user");

exports.createPayment = async (req, res) => {
  const { productId, amount, transactionId } = req.body;
  const { id } = req.params;

  try {
    const newPayment = new Payment({
      user: id,
      product: productId,
      amount,
      transactionId,
    });

    await newPayment.save();

    const user = await User.findById(id);
    user.payments.push(newPayment._id);
    await user.save();

    res.status(201).json({
      message: "Payment created successfully",
      payment: newPayment,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

exports.getAllPayments = async (req, res) => {
  const { id } = req.params; // User ID from params

  try {
    // Get user and populate payments
    const user = await User.findById(id).populate("payments");
    res.status(200).json({ payments: user.payments });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

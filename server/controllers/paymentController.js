const Payment = require("../models/Payment");
const User = require("../models/user");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
  const { id } = req.params;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/cancel`,
      metadata: {
        userId: id,
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: "An error occurred while trying to create a checkout session.",
    });
  }
};

exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log(err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  res.json({ received: true });

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const payment = new Payment({
        amount: session.amount_total,
        transactionId: session.payment_intent,
        status: session.payment_status,
        currency: session.currency,
        stripePaymentId: session.id,
        user: session.metadata.userId,
      });

      await payment.save();

      const user = await User.findById(session.metadata.userId);

      user.payments.push(payment._id);
      user.membershipStatus = "premium";
      await user.save();
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }
};

// const Payment = require("../models/Payment");
// const User = require("../models/user");

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// exports.createCheckoutSession = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const user = await User.findById(id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (!user.stripeCustomerId) {
//       const customer = await stripe.customers.create({
//         email: user.email,
//       });

//       user.stripeCustomerId = customer.id;
//       await user.save();
//     }

//     const session = await stripe.checkout.sessions.create({
//       customer: user.stripeCustomerId,
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price: process.env.PRICE_ID,
//           quantity: 1,
//         },
//       ],
//       mode: "subscription",
//       subscription_data: {
//         trial_period_days: 14,
//       },
//       success_url: `http://localhost:3000/success`,
//       cancel_url: `http://localhost:3000/cancel`,
//       metadata: {
//         userId: id,
//       },
//     });

//     res.json({ id: session.id });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       error: "An error occurred while trying to create a checkout session.",
//     });
//   }
// };

// exports.createCustomerPortalSession = async (req, res) => {
//   const { id } = req.params;
//   console.log(id);
//   try {
//     const user = await User.findById(id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const session = await stripe.billingPortal.sessions.create({
//       customer: user.stripeCustomerId,
//       return_url: "http://localhost:3000/dashboard",
//     });

//     res.json({ url: session.url });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "An error occurred while creating the customer portal session",
//     });
//   }
// };

// exports.handleStripeWebhook = async (req, res) => {
//   const sig = req.headers["stripe-signature"];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       req.rawBody,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     console.log(err);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   res.json({ received: true });

//   try {
//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object;

//       const payment = new Payment({
//         amount: session.amount_total,
//         transactionId: session.payment_intent,
//         status: session.payment_status,
//         currency: session.currency,
//         stripePaymentId: session.id,
//         user: session.metadata.userId,
//       });

//       await payment.save();

//       const user = await User.findById(session.metadata.userId);

//       user.payments.push(payment._id);
//       user.membershipStatus = "premium";
//       user.stripeSubscriptionId = session.subscription;
//       await user.save();
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(400).send(`Webhook Error: ${error.message}`);
//   }
// };

// exports.cancelSubscription = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const user = await User.findById(id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const { stripeSubscriptionId } = user;

//     await stripe.subscriptions.del(stripeSubscriptionId);

//     user.membershipStatus = "free";
//     await user.save();

//     res.json({ message: "Subscription cancelled successfully" });
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .json({ message: "An error occurred while cancelling subscription" });
//   }
// };
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const paymentService = require("../services/paymentService");

exports.createCheckoutSession = async (req, res) => {
  const { id } = req.params;
  try {
    const session = await paymentService.createCheckoutSession(id);
    res.json({ id: session.id });
  } catch (error) {
    res.status(500).send({
      error: "An error occurred while trying to create a checkout session.",
    });
  }
};

exports.createCustomerPortalSession = async (req, res) => {
  const { id } = req.params;
  try {
    const session = await paymentService.createCustomerPortalSession(id);
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while creating the customer portal session",
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
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    await paymentService.handleStripeWebhook(event);
    res.json({ received: true });
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }
};

exports.cancelSubscription = async (req, res) => {
  const { id } = req.params;
  try {
    await paymentService.cancelSubscription(id);
    res.json({ message: "Subscription cancelled successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while cancelling subscription" });
  }
};

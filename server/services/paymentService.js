const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const Payment = require("../models/Payment");
const User = require("../models/user");

const createCheckoutSession = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  if (!user.stripeCustomerId) {
    const customer = await stripe.customers.create({ email: user.email });
    user.stripeCustomerId = customer.id;
    await user.save();
  }

  const session = await stripe.checkout.sessions.create({
    customer: user.stripeCustomerId,
    payment_method_types: ["card"],
    line_items: [{ price: process.env.PRICE_ID, quantity: 1 }],
    mode: "subscription",
    subscription_data: { trial_period_days: 14 },
    success_url: `https://www.feedio.lol/success`,
    cancel_url: `https://www.feedio.lol/cancel`,
    metadata: { userId: userId },
  });

  return session;
};

const createCustomerPortalSession = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: "https://www.feedio.lol/dashboard",
  });
  return session;
};

const handleStripeWebhook = async (event) => {
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
    user.stripeSubscriptionId = session.subscription;
    await user.save();
  }
};

const cancelSubscription = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const { stripeSubscriptionId } = user;
  await stripe.subscriptions.del(stripeSubscriptionId);
  user.membershipStatus = "free";
  await user.save();
};

module.exports = {
  createCheckoutSession,
  createCustomerPortalSession,
  handleStripeWebhook,
  cancelSubscription,
};

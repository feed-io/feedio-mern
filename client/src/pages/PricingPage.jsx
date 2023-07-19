import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import { Star } from "@mui/icons-material";

const tiers = [
  {
    title: "Starter",
    price: "0",
    description: [
      "1 space",
      "10 text reviews in total",
      "Limited 3rd-party imports",
      "Public Show Room page",
      "Public Feedback page",
      "Show Room with our logo",
    ],
    buttonText: "Sign up for free",
    buttonVariant: "outlined",
  },

  {
    title: "Plus",
    subheader: "Most popular",
    price: "10",
    description: [
      "Everything in Starter",
      " 1 space",
      "Unlimited text reviews",
      "Unlimited tags",
      " Remove our branding from all widgets",
      "Custom domain (SSL)",
    ],
    buttonText: "Get started",
    buttonVariant: "contained",
  },
  {
    title: "Premium",
    price: "30",
    description: [
      "Everything in Plus",
      "2 to 10 spaces",
      "Unlimited text reviews",
      "REST API",
      "Webhook",
      "Zapier and Make integrations",
    ],
    buttonText: "Contact us",
    buttonVariant: "outlined",
  },
];

const faqs = [
  {
    question: "Can I add multiple spaces in one account?",
    answer:
      "Yes, you can! Premium plan supports 2 spaces, and Ultimate plan supports 5 spaces. In the Agency plan, you can create as many spaces as you want. The first 5 spaces in the Agency plan are covered by the base price. It will be $50/mo for each additional space beyond the first 5 spaces.",
  },
  {
    question: "What happens after free credits are exhausted?",
    answer:
      "Your customers will not be blocked from submitting their reviews. However on your side, you need to upgrade to the relavant plan to access additional text and video reviews.",
  },
  {
    question: "What is the Show Room?",
    answer:
      'Show Room is a place to display all your selected reviews. They can be video, text or social proof like Twitter shoutouts. <a href="/showRoom" target="_blank" rel="noreferrer">Here is the Show Room for our Feedio product</a>, check it out!',
  },
  {
    question: "How to embed the Show Room?",
    answer:
      "It's just 3 lines of HTML code. You can embed it in any no-code platform (Webflow, WordPress, you name it!) <a href='/integrations' target='_blank' rel='noreferrer'>You can find some samples here.</a>",
  },
  {
    question: "Can I get embed a single video to my site?",
    answer:
      "Yes, but only if you are our premium user! We provide embed code for each video. It's just one-line code. You just copy the code and place it in any no-code platform, like how you embed the Show Room.",
  },
  {
    question: "What information can I collect from my customer?",
    answer:
      "Apart from the review, you can collect your customer's name, headshot, email, title and company, social link. You can also add up to 5 custom data to collect, e.g. phone number, etc.",
  },
  {
    question: "Can I add Metrics add-on later?",
    answer:
      "Yes, you can! You can directly go to Stripe-hosted Portal to pick a subscription plan which covers the Metrics add-on. In the Agency plan, Metrics add-on is included.",
  },
  {
    question: "Do you offer discount?",
    answer:
      "Sure! We offer discounts for bootstrappers and non-profits. It will only apply on the subscription plan. Please send us a message with an intro to your business to get the discount code.",
  },
];

const PricingPage = () => {
  return (
    <>
      <Container maxWidth="md" textAlign="center" pb={3}>
        <Typography variant="h1" mb={4}>
          The easiest way to drive more sales for your business
        </Typography>
        <Typography variant="h4" color="text.secondary" mb={2}>
          Start with 3 text reviews, then upgrade to our paid plan only if
          you're happy.
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  action={tier.title === "Pro" ? <Star /> : null}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}>
                    <Typography
                      component="h2"
                      variant="h3"
                      color="text.primary">
                      €{tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container
        maxWidth="lg"
        sx={{ py: { xs: 2, md: 6 }, px: { xs: 1, sm: 3 } }}>
        <Box py={6} display="flex" justifyContent="center">
          <Typography variant="h2" align="center" gutterBottom>
            Frequently asked questions
          </Typography>
        </Box>
        <Grid container spacing={6}>
          {faqs.map((faq, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Typography variant="h4" mb={2}>
                {faq.question}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {faq.answer}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default PricingPage;

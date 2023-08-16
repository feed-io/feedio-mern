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
  useTheme,
} from "@mui/material";
import { Star } from "@mui/icons-material";
import Pattern from "../assets/pattern.svg";

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
    buttonVariant: "primary",
  },

  {
    title: "Plus",
    subheader: "Most popular",
    price: "30",
    description: [
      "Everything in Starter",
      " 1 space",
      "Unlimited text reviews",
      "Unlimited tags",
      " Remove our branding from all widgets",
      "Custom domain (SSL)",
    ],
    buttonText: "Get started",
    buttonVariant: "primary",
  },
  {
    title: "Enterprise",
    price: "50",
    description: [
      "Everything in Plus",
      "2 to 10 spaces",
      "Unlimited text reviews",
      "REST API",
      "Webhook",
      "Zapier and Make integrations",
    ],
    buttonText: "Get started",
    buttonVariant: "primary",
  },
];

const faqs = [
  {
    question: "What is feedio?",
    answer:
      "Feedio is a reviews and testimonials platform equipped with advanced analytics. We help businesses showcase genuine customer feedback through a customizable widget and provide insights into what their customers are saying and feeling.",
  },
  {
    question: "How does the subscription model work?",
    answer:
      "Our subscription model offers monthly and yearly plans. Once you choose a plan, you'll be billed at the start of the billing cycle. Yearly plans come with a discount compared to monthly plans.",
  },
  {
    question: "Can I change my subscription plan later?",
    answer:
      "Absolutely! You can upgrade or downgrade your subscription at any time. If you choose to upgrade, you'll only pay the difference for the remainder of the billing cycle.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "You can cancel your subscription from the account settings page. Once canceled, you won't be billed for the next cycle. However, there are no refunds for the current billing cycle.",
  },
  {
    question: "Is my data secure with feedio?",
    answer:
      "Yes, data security is our top priority. We use advanced encryption methods to ensure that your data, as well as your customers' feedback, remains confidential and protected.",
  },
  {
    question: "Can I integrate feedio with my existing website or app?",
    answer:
      "Certainly! Feedio is designed for seamless integration with websites and apps. Our easy-to-follow setup guide will have you up and running in minutes.",
  },
  {
    question: "What kind of analytics does feedio provide?",
    answer:
      "Feedio offers deep dive analytics into customer sentiment, feedback trends, and more. You can understand the overall mood of your reviews, identify recurring themes, and get actionable insights to improve your offerings.",
  },
  {
    question: "How does the review widget look?",
    answer:
      "Our review widget is customizable to match your brand's aesthetics. You can choose from various layouts and color schemes to ensure it complements your website or app design.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, including Visa, MasterCard, and American Express. For enterprise clients, we can also arrange for bank transfers.",
  },
  {
    question: "Do you offer any discounts or special pricing?",
    answer:
      "Yes, our yearly plans come with a discount compared to monthly billing. We also offer special pricing for non-profits and educational institutions. Please contact our sales team for more details.",
  },
  {
    question: "I have more questions. How can I reach out?",
    answer:
      "We're here to help! You can contact our support team at [support@feedio.com](mailto:support@feedio.com) or use the live chat feature on our website.",
  },
];

const PricingPage = () => {
  const theme = useTheme();

  return (
    <>
      <Container
        maxWidth="xxl"
        textAlign="center"
        pb={8}
        sx={{ px: [4, 6, 8, 10] }}>
        <Typography variant="h1" textAlign="center" mt={8} mb={4}>
          The easiest way to drive more sales for your business
        </Typography>
        <Typography
          variant="h4"
          color="text.secondary"
          textAlign="center"
          mb={2}>
          Start with 3 text reviews, then upgrade to our paid plan only if
          you're happy.
        </Typography>
      </Container>
      {/* Pricing */}
      <Container
        maxWidth="xxl"
        component="main"
        sx={{
          py: 8,
          px: [4, 6, 8, 10],
          backgroundImage: `url(${Pattern})`,
          backgroundPosition: "right center",
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
        }}>
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
                    bgcolor: theme.palette.secondary.main,
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
                      <Typography variant="subtitle1" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button variant="primary">{tier.buttonText}</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* FAQs */}
      <Container
        maxWidth="xxl"
        sx={{
          py: 8,
          px: [4, 6, 8, 10],
          bgcolor: theme.palette.info.main,
        }}>
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

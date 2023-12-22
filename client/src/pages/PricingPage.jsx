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
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Star } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import FeaturesChart from "../components/FeaturesChart";

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
    question: "What is Feedio?",
    answer:
      "Feedio is a platform that specializes in collecting and showcasing customer reviews and testimonials. We also offer advanced analytics to help you understand your customer feedback better.",
  },
  {
    question: "How does the billing work?",
    answer:
      "We offer a straightforward monthly billing cycle. You'll be billed at the beginning of each month for the services you've subscribed to.",
  },
  {
    question: "Can I modify my subscription later?",
    answer:
      "Of course! You can easily upgrade or downgrade your subscription at any time. The changes will be reflected in your next billing cycle.",
  },
  {
    question: "How can I cancel my subscription?",
    answer:
      "You can terminate your subscription via the account settings page. Note that while you won't be billed for future cycles, we don't offer refunds for the current billing period.",
  },
  {
    question: "Is my data safe with Feedio?",
    answer:
      "Absolutely, we prioritize data security. We employ robust encryption techniques to safeguard your data and your customers' feedback.",
  },
  {
    question: "Can Feedio be integrated into my existing platform?",
    answer:
      "Yes, Feedio is built for easy integration with your current website or application. Our setup guide will help you get started in no time.",
  },
  {
    question: "What analytics does Feedio offer?",
    answer:
      "Feedio provides comprehensive analytics, including sentiment analysis, trending topics in reviews, and actionable insights to help you improve your services.",
  },
  {
    question: "How customizable is the review widget?",
    answer:
      "Our review widget can be tailored to fit your brand's look and feel. You can select from a range of layouts and color options.",
  },
  {
    question: "What payment options are available?",
    answer:
      "We accept all major credit cards such as Visa, MasterCard, and American Express. For larger enterprises, we can facilitate bank transfers.",
  },
  {
    question: "How can I get in touch for more questions?",
    answer:
      "If you have more questions, feel free to email us at [support@feedio.com](mailto:support@feedio.com). We're always here to assist you.",
  },
];

const PricingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Container maxWidth="xxl">
        <Container textAlign="center" sx={{ px: [4, 6, 8, 10], paddingTop: 8 }}>
          <Typography
            variant="h2"
            textAlign="center"
            color={theme.palette.success.main}
            sx={{ fontSize: isMobile ? "2.5rem" : "4.5rem" }}
            mb={4}>
            The easiest way to drive more sales for your business
          </Typography>
        </Container>

        {/* Free trial */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography
            color={theme.palette.success.main}
            variant="h3"
            align="center"
            gutterBottom>
            Start Your Free Trial
          </Typography>
          <Typography
            color={theme.palette.primary.contrastText}
            variant="h6"
            align="center"
            sx={{ mb: 3 }}>
            Experience all the premium features with no commitment.
          </Typography>
          <Box textAlign="center">
            <Typography
              color={theme.palette.primary.contrastText}
              variant="body1"
              sx={{ mb: 4 }}>
              Sign up today and get a 14-day free trial. Explore the full
              capabilities of Feedio without any restrictions. No credit card
              required!
            </Typography>
            <Button
              variant="contained"
              color="primary"
              href="/signup"
              size="large">
              Start Free Trial
            </Button>
          </Box>
        </Container>

        {/* Pricing */}
        <Container
          maxWidth="xxl"
          component="main"
          sx={{
            py: 8,
            px: [4, 6, 8, 10],
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
                <Card sx={{ borderRadius: 4 }}>
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
                      padding: 2,
                    }}
                  />
                  <CardContent sx={{ padding: 2 }}>
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
                      <Typography variant="h6">/mo</Typography>
                    </Box>
                    <ul>
                      {tier.description.map((line) => (
                        <Typography variant="subtitle1" key={line}>
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center", padding: 2 }}>
                    <Button variant="primary">{tier.buttonText}</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Chart Section */}
        <FeaturesChart />

        {/* FAQ Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography
            color={theme.palette.success.main}
            variant="h3"
            align="center"
            gutterBottom>
            Frequently Asked Questions
          </Typography>
          <Card
            sx={{
              borderRadius: 4,
              // bgcolor: theme.palette.secondary.contrastText,
            }}>
            <Box sx={{ mt: 3 }}>
              {faqs.map((faq, index) => (
                <Accordion key={index} sx={{ boxShadow: 0 }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}a-content`}
                    id={`panel${index}a-header`}>
                    <Typography variant="h6">{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Card>
        </Container>
      </Container>
    </>
  );
};

export default PricingPage;

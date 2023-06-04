import React from "react";
import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQSection = () => {
  const faqs = [
    {
      question: "Can I switch plans at any time?",
      answer:
        "Absolutely! You can upgrade or downgrade your plan at any time through your account settings.",
    },
    {
      question: "Do you offer a free trial?",
      answer:
        "Yes, we provide a 14-day free trial for our Pro plan. No credit card is required to start the trial.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, including Visa, Mastercard, American Express, and Discover.",
    },
    {
      question: "Do you offer any discounts?",
      answer:
        "Yes, we offer a 10% discount for non-profit organizations and a 20% discount for annual subscriptions.",
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box py={8}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Frequently Asked Questions
        </Typography>
        {faqs.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default FAQSection;

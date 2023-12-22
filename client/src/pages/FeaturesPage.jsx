import React from "react";
import {
  Grid,
  Typography,
  Button,
  Container,
  Box,
  Avatar,
  Card,
  useTheme,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const FeaturesPage = () => {
  const theme = useTheme();

  const features = [
    {
      title: "Dedicated Feedback Website",
      description:
        "Provide your customers with a dedicated platform to share their feedback. No hassle of development or hosting; we’ve got it all covered for you.",
      image: "/path/to/feedback-site-image.jpg",
    },
    {
      title: "Embeddable Widgets",
      description:
        "Enhance your site with customizable widgets for collecting and displaying testimonials. Choose from various layouts to match your brand's style.",
      image: "/path/to/widget-image.jpg",
    },
    {
      title: "Trend Chart Analysis",
      description:
        "Visualize feedback trends over time. Understand how customer sentiments change and adapt your strategies accordingly.",
      image: "/path/to/trend-chart-image.jpg",
    },
    {
      title: "Sentiment Analysis and Distribution",
      description:
        "Dive deep into your customers' emotions with our advanced NLP-driven sentiment analysis. Understand and categorize customer sentiments for more targeted responses.",
      image: "/path/to/sentiment-analysis-image.jpg",
    },
    {
      title: "Interactive Word Cloud",
      description:
        "Visualize the most frequently mentioned words in your customer feedback. Quickly identify common themes and areas of concern.",
      image: "/path/to/word-cloud-image.jpg",
    },
    {
      title: "Rating Distribution Insights",
      description:
        "Get a comprehensive view of how your products or services are rated. Analyze feedback ratings to gauge overall customer satisfaction and loyalty.",
      image: "/path/to/rating-distribution-image.jpg",
    },
    {
      title: "Net Promoter Score (NPS)",
      description:
        "Measure customer loyalty and satisfaction with our NPS tool. Understand your customers’ willingness to recommend your services to others.",
      image: "/path/to/nps-image.jpg",
    },
    {
      title: "Customization at Your Fingertips",
      description:
        "Tailor Feedio.app’s look and feel to match your brand’s identity. From colors to logos, create a seamless experience for your customers.",
      image: "/path/to/customization-image.jpg",
    },
    {
      title: "Uncompromised Data Security",
      description:
        "Your data’s security is our top priority. Feedio.app adheres to the latest privacy standards and regulations, ensuring your information is always protected.",
      image: "/path/to/security-image.jpg",
    },
  ];

  return (
    <>
      {/* Header Section */}
      <Container maxWidth="lg" sx={{ py: 8, position: "relative" }}>
        <Typography
          variant="h2"
          align="center"
          color={theme.palette.success.main}
          gutterBottom>
          Discover the Power of Feedio
        </Typography>
        <Typography
          color={theme.palette.primary.contrastText}
          variant="h6"
          align="center">
          Seamlessly integrate advanced feedback analysis into your workflow
          with Feedio. No development or hosting needed.
        </Typography>
      </Container>

      {/* Features Sections */}
      {features.map((feature, index) => (
        <Container
          maxWidth="lg"
          sx={{ py: 8, position: "relative" }}
          key={index}>
          <Grid
            container
            spacing={4}
            alignItems="center"
            direction={index % 2 === 0 ? "row" : "row-reverse"}>
            <Grid item xs={12} md={6}>
              <img
                src={feature.image}
                alt={feature.title}
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                color={theme.palette.success.main}
                variant="h5"
                gutterBottom>
                {feature.title}
              </Typography>
              <Typography
                color={theme.palette.primary.contrastText}
                variant="body1">
                {feature.description}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      ))}

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          color={theme.palette.success.main}
          variant="h4"
          align="center"
          gutterBottom>
          Customer Success Stories
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[1, 2, 3].map((testimonial, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 3,
                }}>
                <Avatar sx={{ mb: 2, bgcolor: "secondary.main" }}>
                  <PersonIcon />
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  Customer {index + 1}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}>
                  "This is a placeholder testimonial. It gives an idea of how
                  real customer feedback might look on your site."
                </Typography>
                <Typography variant="subtitle2" color="text.primary">
                  - Name, Position
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Why Feedio Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          align="center"
          color={theme.palette.success.main}
          gutterBottom>
          Why Feedio Stands Out
        </Typography>
        <Typography
          color={theme.palette.primary.contrastText}
          variant="h6"
          align="center">
          From seamless integration to deep insights – Feedio offers a
          comprehensive solution for enhancing customer engagement and feedback
          analysis.
        </Typography>
      </Container>

      {/* CTA Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom>
            Ready to Elevate Your Customer Feedback?
          </Typography>
          <Box textAlign="center">
            <Button
              variant="contained"
              color="primary"
              href="/signup"
              sx={{ mt: 4 }}>
              Get Started with Feedio
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default FeaturesPage;

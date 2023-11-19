import React from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import Learn from "../assets/learn.svg";
import Integration from "../assets/integrate.svg";
import Graph from "../assets/graph.svg";
import Blob from "../assets/blob.svg";
import Sentiment from "../assets/sentiment.svg";
import Testimonial from "../assets/testimonial.svg";
import Analytics from "../assets/analytics.svg";
import MaintenanceModal from "../components/MaintenanceModal";

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isMaintenanceMode, setMaintenanceMode] = React.useState(false);

  const features = [
    {
      title: "Engage & Learn",
      description:
        "Engage with your customers, respond to their feedback, and learn from their experiences to enhance your offerings.",
      image: Learn,
    },
    {
      title: "Deep Dive Analytics",
      description:
        "Understand the sentiment behind every review. Dive deep into analytics to uncover insights and drive improvements.",
      image: Analytics,
    },
    {
      title: "Showcase Genuine Reviews",
      description:
        "Display authentic testimonials with our customizable widget. Let your customers do the talking and build trust instantly.",
      image: Testimonial,
    },
    {
      title: "Seamless Integration",
      description:
        "Easily integrate feedio with your website or app. Set up in minutes and start collecting invaluable feedback.",
      image: Integration,
    },
  ];

  return (
    <main>
      {/* Header Section */}
      <Box
        sx={{
          bgcolor: theme.palette.info.main,
          pt: isMobile ? 8 : 18,
          pb: isMobile ? 5 : 10,
          backgroundImage: `url(${Blob})`,
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "left", pb: 12 }}>
                <Typography variant={isMobile ? "h4" : "h1"}>
                  Elevate Your Brand with Authentic Feedback
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Feedback is more than just words; it's a goldmine of insights.
                </Typography>
                <Button variant="contained" color="primary" href="/pricing">
                  Try FREE now
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <img src={Graph} alt="Graph" style={{ width: "100%" }} />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant={isMobile ? "h4" : "h2"}>
            Harness the power of genuine reviews and advanced analytics to drive
            growth and build trust.
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card sx={{ p: 3, textAlign: "center" }}>
                <img
                  src={feature.image}
                  alt={feature.title}
                  style={{ height: 200 }}
                />
                <Typography variant="h6">{feature.title}</Typography>
                <Typography variant="body1">{feature.description}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box sx={{ bgcolor: theme.palette.info.main, py: 8 }}>
        <Container maxWidth="lg">
          <Grid container alignItems="center">
            <Grid item xs={12} md={4}>
              <img
                src={Sentiment}
                alt="Sentiment Analysis"
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant={isMobile ? "h4" : "h2"}>
                Ready to transform feedback into growth?
              </Typography>
              <Button
                variant="contained"
                color="primary"
                href="/pricing"
                sx={{ mt: 4 }}>
                Get started
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </main>
  );
};

export default LandingPage;

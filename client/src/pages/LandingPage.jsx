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

import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";

import Learn from "../assets/learn.svg";
import Integration from "../assets/integrate.svg";
import customWidget from "../assets/customWidgets.svg";
import AnalyticsCard from "../assets/analyticsCard.svg";
import headerAsset from "../assets/header-asset.svg";
import Blob from "../assets/blob.svg";
import Sentiment from "../assets/sentiment.svg";
import Testimonial from "../assets/testimonial.svg";
import Analytics from "../assets/analytics.svg";

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const features = [
    {
      title: "Engage & Learn",
      description:
        "Connect with your customers by gaining insights from their feedback. Utilize their experiences to continually improve and refine your offerings.",
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

  const why = [
    {
      title: "Easy Integration",
      description:
        "Simple code snippet integration into your website or application. Start collecting valuable feedback in minutes.",
      image: Integration,
    },
    {
      title: "Customizable Widgets",
      description:
        "Personalize the look and feel of your feedback widgets to match your brand - change colors, remove Feedio branding, and more.",
      image: customWidget,
    },
    {
      title: "Comprehensive Feedback Analysis",
      description:
        "Gain insights from trend analysis, sentiment analysis, and more to understand customer perspectives and improve your offerings.",
      image: AnalyticsCard,
    },
    {
      title: "Diverse Application Across Industries",
      description:
        "Versatile feedback collection suitable for SaaS, eCommerce, and more - understand specific feature feedback or general product sentiment.",
      image: "/path/to/industries-image.jpg",
    },
  ];

  return (
    <main>
      {/* Header Section */}

      <Box
        sx={{
          bgcolor: theme.palette.background,
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
              <Box
                color={theme.palette.success.main}
                sx={{ textAlign: "left", pb: 6 }}>
                <Typography variant={isMobile ? "h4" : "h1"}>
                  Elevate Your Brand with Authentic Feedback
                </Typography>
                <Typography
                  color={theme.palette.primary.contrastText}
                  variant="h6">
                  Feedback is more than just words; it's a goldmine of insights.
                </Typography>
                <Button variant="contained" color="primary" href="/pricing">
                  Try FREE now
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <img src={headerAsset} alt="Graph" style={{ width: "100%" }} />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container
        maxWidth="lg"
        sx={{
          color: theme.palette.primary.contrastText,
          py: 2,
          pb: 8,
        }}>
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography
            color={theme.palette.success.main}
            variant={isMobile ? "h4" : "h2"}>
            Harness the power of genuine reviews and advanced analytics to drive
            growth and build trust.
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card sx={{ p: 3, textAlign: "center", borderRadius: 4 }}>
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

      {/* How it works Section */}
      <Container
        maxWidth="lg"
        sx={{ color: theme.palette.primary.contrastText, py: 4 }}>
        <Box py={8} textAlign="center">
          <Typography
            color={theme.palette.success.main}
            variant={isMobile ? "h4" : "h2"}
            gutterBottom>
            How It Works
          </Typography>
          <Typography variant="h6">
            Simple steps to get started with Feedio
          </Typography>

          {/* Step 1: Sign-Up and Integration */}
          <Grid container spacing={4} justifyContent="center" mt={4}>
            <Grid item xs={12} sm={6} md={4}>
              <TextSnippetIcon style={{ fontSize: 60 }} />
              <Typography variant="h6" mt={2}>
                Sign-Up and Integrate
              </Typography>
              <Typography>
                Start with a 14-day trial and integrate Feedio into your site
                with a simple code snippet.
              </Typography>
            </Grid>

            {/* Step 2: Collect and Analyze Feedback */}
            <Grid item xs={12} sm={6} md={4}>
              <AutoGraphIcon style={{ fontSize: 60 }} />
              <Typography variant="h6" mt={2}>
                Collect and Analyze Feedback
              </Typography>
              <Typography>
                Collect feedback via web pages and widgets, automatically
                process and analyze the data for trends and sentiment.
              </Typography>
            </Grid>

            {/* Step 3: Customize and Use Insights */}
            <Grid item xs={12} sm={6} md={4}>
              <DashboardCustomizeIcon style={{ fontSize: 60 }} />
              <Typography variant="h6" mt={2}>
                Customize and Act on Insights
              </Typography>
              <Typography>
                Customize the color scheme, branding, and get actionable
                insights to enhance your services or products.
              </Typography>
            </Grid>
          </Grid>
          <Box margin={2} padding={2}>
            <Button variant="contained" color="primary" size="large" mt={4}>
              Get Started
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Why Section */}
      <Container
        maxWidth="lg"
        sx={{ color: theme.palette.primary.contrastText, py: 2, pb: 4 }}>
        <Typography
          color={theme.palette.success.main}
          variant={isMobile ? "h4" : "h2"}
          align="center"
          paddingBottom={8}
          gutterBottom>
          Why use Feedio?
        </Typography>
        <Grid container spacing={4}>
          {why.map((feature, index) => (
            <Grid
              item
              container
              spacing={2}
              key={index}
              direction={index % 2 === 0 ? "row-reverse" : "row"}>
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src={feature.image}
                  alt={feature.title}
                  sx={{ width: "100%", maxHeight: 300, objectFit: "contain" }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}>
                <Typography
                  color={theme.palette.success.main}
                  gutterBottom
                  variant="h5">
                  {feature.title}
                </Typography>
                <Typography variant="body2">{feature.description}</Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Box paddingTop={10}>
        {/* <iframe
          height="400px"
          id="656fa487727bcf21cfbe2b00"
          src="http://localhost:8080/api/users/656d427837d1d557842a0e04/products/656d436a0d0997691374515d/widgets/656fa487727bcf21cfbe2b00/serve?hideDate=on&autoScroll=on&type=carousel"
          frameBorder="0"
          scrolling="no"
          width="100%"></iframe> */}
      </Box>

      {/* Call to Action Section */}
      <Box sx={{ color: theme.palette.primary.contrastText, py: 8 }}>
        <Container maxWidth="lg">
          <Grid container alignItems="center">
            <Grid item xs={12} md={4}>
              <img
                src={Sentiment}
                alt="Sentiment Analysis"
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} md={8} pl={8}>
              <Typography
                color={theme.palette.success.main}
                variant={isMobile ? "h4" : "h2"}>
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

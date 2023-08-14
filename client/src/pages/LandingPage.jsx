import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";

import LandingImg1 from "../assets/landing1.svg";
import ManageImg from "../assets/manage.svg";
import AmazonTile from "../assets/amazonTile.svg";
import GoogleTile from "../assets/googleTile.svg";
import IgTile from "../assets/igTile.svg";
import TiktokTile from "../assets/tiktokTile.svg";
import productHuntTile from "../assets/productHunt.svg";
import redditTile from "../assets/redditTile.svg";
import twitterTile from "../assets/twitterTile.svg";
import yelpTile from "../assets/yelp.svg";
import Framer from "../assets/framer.svg";
import Shopify from "../assets/shopify.svg";
import Webflow from "../assets/webflow.svg";
import Wordpress from "../assets/wordpress.svg";
import Blob from "../assets/blob.svg";
import Blob1 from "../assets/blob1.svg";
import Blob2 from "../assets/blob2.svg";
import Pattern from "../assets/pattern.svg";
import Graph from "../assets/graph.svg";
import Sentiment from "../assets/sentiment.svg";
import Testimonial from "../assets/testimonial.svg";
import Analytics from "../assets/analytics.svg";

import React from "react";

const LandingPage = () => {
  const theme = useTheme();

  const platforms = [
    {
      src: Framer,
      alt: "Amazon",
    },
    {
      src: Shopify,
      alt: "Google",
    },
    {
      src: Webflow,
      alt: "Instagram",
    },
    {
      src: Wordpress,
      alt: "Tiktok",
    },
    {
      src: AmazonTile,
      alt: "Amazon",
    },
    {
      src: GoogleTile,
      alt: "Google",
    },
    {
      src: IgTile,
      alt: "Instagram",
    },
    {
      src: TiktokTile,
      alt: "Tiktok",
    },
    {
      src: productHuntTile,
      alt: "Product Hunt",
    },
    {
      src: redditTile,
      alt: "Reddit",
    },
    {
      src: twitterTile,
      alt: "Twitter",
    },
    {
      src: yelpTile,
      alt: "Yelp",
    },
  ];

  const features = [
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
      image: ManageImg,
    },
    {
      title: "Engage & Learn",
      description:
        "Engage with your customers, respond to their feedback, and learn from their experiences to enhance your offerings.",
      image: LandingImg1,
    },
  ];

  return (
    <main>
      <Box
        sx={{
          bgcolor: theme.palette.info.main,
          pt: 32,
          pb: 10,
          backgroundImage: `url(${Blob})`,
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "left", pb: 12, pl: 2 }}>
                <Typography
                  variant="h1"
                  gutterBottom
                  sx={{ fontSize: "4.5rem" }}>
                  Elevate Your Brand with Authentic Feedback
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  gutterBottom
                  sx={{ fontSize: "1rem" }}>
                  Discover what your customers truly think with feedio - the
                  ultimate reviews and testimonials platform.
                </Typography>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-start", pt: 2 }}>
                  <Box>
                    <Button variant="contained" color="primary" to="/pricing">
                      Try FREE now
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}>
                <img src={Graph} alt="Graph" style={{ maxWidth: "100%" }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container
        maxWidth="xxl"
        sx={{
          bgcolor: theme.palette.primary.contrastText,
          padding: "0 32px",
          paddingTop: "40px",
          paddingBottom: "40px",
          backgroundImage: `url(${Pattern}), url(${Pattern})`,
          backgroundSize: "cover, cover",
          backgroundPosition: "left , right",
          backgroundRepeat: "repeat, repeat",
        }}>
        <Box sx={{ textAlign: "center", pb: 4 }}>
          <Typography variant="h2" gutterBottom>
            Harness the power of genuine reviews and advanced analytics to drive
            growth and build trust.
          </Typography>
        </Box>
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
              <Card
                variant="outlined"
                sx={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  padding: "24px",
                  maxWidth: "400px",
                  margin: "0 auto",
                  width: "100%",
                }}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  padding={2}>
                  <img
                    src={feature.image}
                    alt={feature.title}
                    style={{
                      maxHeight: 250,
                      maxWidth: "100%",
                      marginBottom: "10px",
                    }}
                  />
                  <Typography
                    variant="h6"
                    align="center"
                    gutterBottom
                    style={{ maxWidth: "90%" }}>
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    mt={2}
                    style={{ maxWidth: "90%" }}>
                    {feature.description}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box
        sx={{
          bgcolor: theme.palette.info.main,
          position: "relative",
          py: 12,
          "&::before, &::after": {
            content: '""',
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "20%",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          },
          "&::before": {
            backgroundImage: `url(${Blob1})`,
            left: 0,
            backgroundPosition: "left center",
          },
          "&::after": {
            backgroundImage: `url(${Blob2})`,
            right: 0,
            backgroundPosition: "right center",
          },
        }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" color="black">
            Integrate with any platform
          </Typography>
          <Typography
            variant="body1"
            align="center"
            mt={4}
            maxWidth="36rem"
            mx="auto"
            color="grey.400">
            We built the ultimate tool for showcasing your satisfied customers.
            With 3-lines of HTML code, you can embed all your feedback to any
            platform!
          </Typography>
          <Grid container spacing={2} mt={12}>
            {platforms.map((platform, index) => (
              <Grid item xs={6} lg={3} key={index}>
                <Card
                  variant="outlined"
                  sx={{ overflow: "hidden", borderRadius: 8 }}>
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      py: 2,
                      px: 3,
                      bgcolor: "#fff",
                    }}>
                    <img
                      src={platform.src}
                      alt={platform.alt}
                      style={{ maxHeight: 40, maxWidth: "100%" }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <iframe
        class="custom-iframe"
        height="550px"
        id="64dab17c1743327f0da05edd"
        src="https://feedio-server.onrender.com/api/users/64c842c6963a1e52fdec757e/products/64c8445b963a1e52fdec7585/widgets/64dab17c1743327f0da05edd/serve?hideDate=on&autoScroll=on&type=carousel"
        frameBorder="0"
        scrolling="no"
        width="100%"></iframe>
      <Container
        maxWidth="xxl"
        sx={{
          bgcolor: theme.palette.primary.contrastText,
          padding: "0 32px",
          paddingTop: "40px",
          paddingBottom: "40px",
          backgroundImage: `url(${Pattern}), url(${Pattern})`,
          backgroundSize: "cover, cover",
          backgroundPosition: "left center , right center",
        }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                height: "100%",
              }}>
              <img
                src={Sentiment}
                alt="Sentiment"
                style={{ maxWidth: "75%" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box sx={{ textAlign: "left", pb: 12, pl: 2 }}>
              <Typography variant="h2" mb={4} sx={{ fontSize: "3.4rem" }}>
                Ready to transform feedback into growth?
              </Typography>
              <Box
                sx={{ display: "flex", justifyContent: "flex-start", mb: 8 }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ transform: "scale(1.05)" }}
                  href="/pricing">
                  Get started
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default LandingPage;

import React, { useState } from "react";
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
  const [isMaintenanceMode, setMaintenanceMode] = useState(false);

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
      {/* {isMaintenanceMode && (
        <MaintenanceModal
          isOpen={isMaintenanceMode}
          message="Our backend is currently undergoing maintenance. We apologize for any inconvenience."
          onClose={() => setMaintenanceMode(false)}
        />
      )} */}

      <Box
        sx={{
          bgcolor: theme.palette.info.main,
          pt: 18,
          pb: 10,
          backgroundImage: `url(${Blob})`,
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}>
        <Container maxWidth="xxl" sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <Grid container spacing={4} sx={{ paddingLeft: 0, paddingRight: 0 }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "left", pb: 12, pl: 2 }}>
                <Typography
                  variant="h1"
                  gutterBottom
                  sx={{ fontSize: isMobile ? "2.5rem" : "4.5rem" }}>
                  Elevate Your Brand with Authentic Feedback
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  gutterBottom
                  sx={{ fontSize: "1rem" }}>
                  Feedback is more than just words; it's a goldmine of insights.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    pt: 2,
                  }}>
                  <Button
                    variant="primary"
                    color="primary"
                    href="/pricing"
                    sx={{ fontSize: isMobile ? "0.8rem" : "1rem" }}>
                    Try FREE now
                  </Button>
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

      <Container maxWidth="xxl" sx={{ paddingLeft: 0, paddingRight: 0 }}>
        <Box
          sx={{
            bgcolor: theme.palette.info.main,
            textAlign: "center",
            paddingTop: "40px",
            paddingBottom: "40px",
          }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: isMobile ? "2.5rem" : "4.5rem",
              paddingLeft: 0,
              paddingRight: 0,
            }}
            gutterBottom>
            Harness the power of genuine reviews and advanced analytics to drive
            growth and build trust.
          </Typography>
        </Box>
        <Grid
          bgcolor={theme.palette.info.main}
          container
          spacing={4}
          justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
              <Card
                sx={{
                  borderRadius: 8,
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

      <Container
        maxWidth="xxl"
        sx={{
          paddingLeft: 0,
          paddingRight: 0,
          bgcolor: theme.palette.info.main,
          py: 8,
          px: [4, 6, 8, 10],
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
            <Box
              sx={{
                textAlign: "left",
                pb: 12,
                pl: 2,
              }}>
              <Typography
                variant="h2"
                mb={4}
                sx={{ fontSize: isMobile ? "2.5rem" : "4.5rem" }}>
                Ready to transform feedback into growth?
              </Typography>
              <Box
                sx={{ display: "flex", justifyContent: "flex-start", mb: 8 }}>
                <Button
                  variant="primary"
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

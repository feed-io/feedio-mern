import React from "react";
import {
  Grid,
  Typography,
  Button,
  Container,
  useTheme,
  Card,
  CardContent,
  Box,
  useMediaQuery,
} from "@mui/material";

import Blob from "../assets/blob.svg";
import Blob1 from "../assets/blob1.svg";
import Blob2 from "../assets/blob2.svg";
import Testimonial from "../assets/testimonial.svg";
import Sentiment from "../assets/sentiment.svg";
import FeedbackWidget from "../assets/feedbackWidget.svg";
import Trend from "../assets/trend.svg";
import Graph2 from "../assets/graph2.svg";

const FeaturesPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Container
        maxWidth="xxl"
        sx={{
          bgcolor: theme.palette.info.main,
          py: 8,
          px: [4, 8, 12],
          backgroundImage: `url(${Blob})`,
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}>
        <Typography
          variant="h1"
          textAlign="center"
          mb={4}
          sx={{ fontSize: isMobile ? "2.5rem" : "4.5rem" }}>
          Collect and display feedback and reviews all in one solution
        </Typography>
      </Container>
      {/* Social proof */}
      <Container
        maxWidth="xxl"
        sx={{
          bgcolor: theme.palette.info.main,
          py: 8,
          px: [4, 8, 12],
          backgroundImage: `url(${Blob1})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "55%",
          backgroundPosition: "left center ",
        }}>
        <Typography variant="h2" fontWeight="600" mb={4} textAlign="center">
          Social proof
        </Typography>
        <Grid container spacing={6} sx={{ display: "flex" }}>
          <Grid item xs={12} md={4} sx={{ display: "flex" }}>
            <Card
              sx={{
                borderRadius: "16px",
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <img
                  loading="lazy"
                  src={Testimonial}
                  alt="Testimonials Widget"
                  style={{ display: "block", margin: "0 auto", width: "350px" }}
                />
                <Typography
                  variant="h4"
                  fontWeight="600"
                  mb={2}
                  textAlign="center">
                  Feedio's Testimonial Showcase
                </Typography>
                <Typography variant="body1" mt={4} textAlign="center">
                  Showcase your brand's credibility effortlessly. With just
                  three lines of code, embed genuine feedback directly on your
                  website or app. Choose between our customizable widgets or
                  dedicated landing pages to display reviews in a way that
                  aligns with your brand's aesthetics.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4} sx={{ display: "flex" }}>
            <Card
              sx={{
                borderRadius: "16px",
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <img
                  loading="lazy"
                  src={FeedbackWidget}
                  alt="Dedicated Testimonials Landing Page"
                  style={{ display: "block", margin: "0 auto", width: "250px" }}
                />
                <Typography
                  variant="h4"
                  fontWeight="600"
                  mb={2}
                  textAlign="center">
                  Feedio's Feedback Collection Hub
                </Typography>
                <Typography variant="body1" mt={4} textAlign="center">
                  Transform your user experience with Feedio's Interactive
                  Testimonial Collector. Whether through a subtle widget or a
                  dedicated landing page, invite your customers to share their
                  stories, ratings, and feedback. Seamlessly blend it into your
                  website's design, making feedback collection more intuitive
                  and engaging. With Feedio, harness the power of authentic
                  testimonials and drive your brand's growth.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      {/* Analytics */}
      <Container
        maxWidth="xxl"
        sx={{
          bgcolor: theme.palette.info.main,
          py: 8,
          px: [4, 8, 12],
          backgroundImage: `url(${Blob2})`,
          backgroundSize: "center",
          backgroundPosition: "left center",
        }}>
        <Typography variant="h2" fontWeight="600" mb={4} textAlign="center">
          Analytics
        </Typography>
        <Grid container spacing={6} sx={{ display: "flex" }}>
          <Grid item xs={12} md={4} sx={{ display: "flex" }}>
            <Card
              sx={{
                borderRadius: "16px",
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <img
                  loading="lazy"
                  src={Trend}
                  alt="More social proof"
                  style={{
                    display: "block",
                    margin: "0 auto",
                    width: "400px",
                  }}
                />
                <Typography variant="h4" mt={4} mb={3} textAlign="center">
                  Rating Trends Over Time
                </Typography>
                <Typography variant="body1" mt={4} textAlign="center">
                  Track Your Progress, One Review at a Time: With our Rating
                  Trends tool, monitor how your feedback scores evolve over
                  time. Understand the impact of your initiatives, identify
                  patterns, and ensure consistent growth in customer
                  satisfaction. Your journey towards excellence, mapped out.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4} sx={{ display: "flex" }}>
            <Card
              sx={{
                borderRadius: "16px",
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <img
                  loading="lazy"
                  src={Graph2}
                  alt="Testimonials Widget"
                  style={{ display: "block", margin: "0 auto", width: "350px" }}
                />
                <Typography
                  variant="h4"
                  fontWeight="600"
                  mb={2}
                  textAlign="center">
                  Advanced Analytics Suite
                </Typography>
                <Typography variant="body1" mt={4} textAlign="center">
                  Go beyond just collecting feedback. Dive deep into customer
                  sentiment with our suite of analytics tools. Visualize
                  feedback trends with our word cloud, understand rating
                  patterns over time, and get insights from distribution charts.
                  Make informed decisions and strategies based on real customer
                  sentiments.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4} sx={{ display: "flex" }}>
            <Card
              sx={{
                borderRadius: "16px",
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <img
                  loading="lazy"
                  src={Sentiment}
                  alt="Dedicated Testimonials Landing Page"
                  style={{ display: "block", margin: "0 auto", width: "350px" }}
                />
                <Typography
                  variant="h4"
                  fontWeight="600"
                  mb={2}
                  textAlign="center">
                  Comprehensive Sentiment Distribution
                </Typography>
                <Typography variant="body1" mt={4} textAlign="center">
                  Beyond Stars and Numbers: Understand the Emotion Behind Every
                  Review: Our Sentiment Distribution tool deciphers the emotions
                  behind each testimonial. Categorizing feedback into positive,
                  neutral, or negative sentiments, it offers a nuanced view of
                  customer perceptions, helping you tailor your approach for
                  maximum impact.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      {/* Call to Action */}
      <Container
        maxWidth="xxl"
        sx={{
          bgcolor: theme.palette.info.main,
          py: 8,
          px: [4, 8, 12],
          backgroundImage: `url(${Blob1})`,
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
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
    </>
  );
};

export default FeaturesPage;

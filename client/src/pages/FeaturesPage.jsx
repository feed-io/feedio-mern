import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

import LandingImg1 from "../assets/landing1.svg";
import SocialImg from "../assets/social.svg";
import ManageImg from "../assets/manage.svg";
import BestReviewImg from "../assets/bestReview.svg";

const FeaturesPage = () => {
  return (
    <>
      <Box py={{ xs: 3, md: 5 }} pt={{ md: 10 }} mt={5}>
        <Container maxWidth="md">
          <Box pb={{ xs: 3, md: 4 }} textAlign="center">
            <Typography variant="h1" mb={4}>
              Collect and display feedback and reviews all in one solution
            </Typography>
          </Box>
        </Container>
      </Box>
      <Box id="consumer-apps">
        <Container maxWidth="lg" px={{ md: 2 }}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <Box display="flex" justifyContent="center" p={2}>
                <Box mt={10} alignSelf="center">
                  <img loading="lazy" src={SocialImg} alt="More social proof" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Box px={{ xs: 1, sm: 3 }} py={{ sm: 6 }}>
                <Box pt={6}>
                  <Typography variant="h4" fontWeight="600" mb={2}>
                    More social proof
                  </Typography>
                  <Typography variant="h3" mb={3}>
                    Text and video feedback
                  </Typography>
                  <Typography variant="body1" color="text.secondary" mt={4}>
                    If you have reviews on social media (e.g. Twitter, LinkedIn,
                    TikTok etc), video hosting platforms (e.g. YouTube, Vimeo),
                    and other review sites (e.g. G2, Google, Capterra, Yelp
                    etc), bring them all to your account. Feedio helps you
                    manage all your social proof in a single place!
                  </Typography>
                  <Box mt={6}>
                    <Button
                      href="/pricing"
                      variant="contained"
                      color="primary"
                      target="_blank">
                      Try it for free
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box py={6}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Box
                px={4}
                py={6}
                display="flex"
                flexDirection="column"
                alignItems="center">
                <Typography variant="h5" color="primary.main" mb={2}>
                  Quick to setup
                </Typography>
                <Typography variant="h3" mb={3}>
                  A dedicated landing page
                </Typography>
                <Typography variant="body1" color="text.secondary" mt={4}>
                  Create a dedicated landing page for your business. Share the
                  page link easily via email, social media, or even SMS. Setup
                  can be done in two minutes.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  href="/pricing"
                  target="_blank"
                  mt={6}>
                  Try it for free
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box p={4} display="flex" justifyContent="center">
                <img src={LandingImg1} width="540" alt="quick to set up" />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box py={6}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <Box p={4} display="flex" justifyContent="center">
                <img src={ManageImg} width="540" alt="easy to manage" />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Box
                px={4}
                py={6}
                display="flex"
                flexDirection="column"
                alignItems="center">
                <Typography variant="h5" color="primary.main" mb={2}>
                  Easy to manage
                </Typography>
                <Typography variant="h3" mb={3}>
                  A dashboard to manage all your feedback
                </Typography>
                <Typography variant="body1" color="text.secondary" mt={4}>
                  You will have a simple &amp; clean dashboard to manage all
                  your feedback in one place.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  href="/pricing"
                  target="_blank"
                  mt={6}>
                  Try it for free
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box>
        <Container maxWidth="lg" px={{ md: 2 }}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Box px={{ xs: 1, sm: 3 }} py={{ sm: 6 }}>
                <Box pt={6}>
                  <Typography variant="h4" fontWeight="600" mb={2}>
                    Embed the Show Room
                  </Typography>
                  <Typography variant="h3" mb={3}>
                    The best feedback all in one place
                  </Typography>
                  <Typography variant="body1" my={4}>
                    Treat the Show Room as the place to showcase all your
                    favorite feedback. You can embed it to your website in under
                    a minute. No coding knowledge required!
                  </Typography>
                  <Link to="/showRoom">See our Show Room in action 👉</Link>
                  <Box mt={6}>
                    <Button
                      href="/pricing"
                      variant="contained"
                      color="primary"
                      target="_blank">
                      Try it for free
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="center" p={2}>
                <Box mt={10} alignSelf="center">
                  <img
                    loading="lazy"
                    src={BestReviewImg}
                    alt="all in one show room"
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default FeaturesPage;

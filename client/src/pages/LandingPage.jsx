import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  SvgIcon,
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
import WidgetDisplay from "../components/WidgetDisplay";

const LandingPage = () => {
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

  const benefits = ["No coding skill required.", "Start in under 2 minutes."];

  function CheckIcon() {
    return (
      <SvgIcon fontSize="small" color="success.main">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clipRule="evenodd"
        />
      </SvgIcon>
    );
  }

  return (
    <main>
      <Box sx={{ bgcolor: "white", pt: 32, pb: 10 }}>
        <iframe
          src="http://localhost:8080/api/users/64b98dfac832642e75f4dcd0/products/64b9ac1324c4519cba0203b0/widgets/64bbefadb841ddd73b8975e0/serve"
          width="100%"
          height="800px"></iframe>

        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", pb: 12 }}>
            <Typography variant="h1" gutterBottom>
              Get feedback from your customers with ease
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Collecting feedback is hard, we get it! So we built Feedio. In
              minutes, you can collect feedback from your customers with no need
              for a developer or website hosting.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box>
                <Button variant="contained" color="primary" to="/pricing">
                  Try FREE now
                </Button>
                <Typography variant="body2" mt={2}>
                  Get started with free credits on us.
                  <Link to="/pricing" style={{ textDecoration: "none" }}>
                    See our pricing →
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      <Box sx={{ py: 12 }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", pb: 12 }}>
            <Typography variant="h1" gutterBottom>
              Collect and display reviews and testimonials all in one place
            </Typography>
          </Box>
        </Container>
      </Box>
      <Box sx={{ overflow: "hidden" }}>
        <Box id="b2b-companies">
          <Container maxWidth="lg" sx={{ py: 6 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box px={4} sx={{ maxWidth: "36rem", mx: "auto" }}>
                  <Typography variant="h5" gutterBottom>
                    Quick to setup
                  </Typography>
                  <Typography variant="h3" gutterBottom>
                    A dedicated landing page
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 4, color: "grey.500" }}>
                    Create a dedicated landing page for your business. Share the
                    page link easily via email, social media, or even SMS. Setup
                    can be done in two minutes.
                  </Typography>
                  <Box sx={{ mt: 6 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to="/pricing">
                      Try FREE now
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ my: "auto", p: 4 }}>
                  <img
                    src={LandingImg1}
                    width="540"
                    height="405"
                    alt="quick to set up"
                    loading="lazy"
                    style={{
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      <Box id="agency-freelancer">
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <Box sx={{ my: "auto", p: 4 }}>
                <img
                  src={ManageImg}
                  width="540"
                  alt="easy to manage"
                  loading="lazy"
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Box px={4} sx={{ maxWidth: "36rem", mx: "auto" }}>
                <Typography variant="h5" gutterBottom>
                  Easy to manage
                </Typography>
                <Typography variant="h3" gutterBottom>
                  A dashboard to manage all your feedback
                </Typography>
                <Typography variant="body1" sx={{ mt: 4, color: "grey.500" }}>
                  You will have a simple &amp; clean dashboard to manage all
                  your feedback in one place. It's like your email inbox, but
                  it's designed for your social proof!
                </Typography>
                <Box sx={{ mt: 6 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/pricing">
                    Try FREE now
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box py={12}>
        <Container maxWidth="lg">
          <Typography variant="h1" align="center" color="black">
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
                <Card variant="outlined" sx={{ overflow: "hidden" }}>
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: 8,
            }}></Box>
        </Container>
      </Box>
      <Box py={10} bgcolor="white">
        <Container maxWidth="md">
          <Typography variant="h2" align="center" mb={4}>
            Ready to collect feedback?
          </Typography>
          <Typography variant="body1" align="center" mb={8}>
            We are loved by Fortune 500 companies, early-stage startups,
            marketing agencies, real estate agents, freelancers, and many more.
            Your customers' testimonials are the best social proof you can get!
            Get started now 👇
          </Typography>
          <Grid container spacing={5} my={8} justifyContent="space-between">
            {benefits.map((benefit, index) => (
              <Grid
                item
                xs={12}
                lg={6}
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: index % 2 === 0 ? "flex-end" : "flex-start",
                }}>
                <CheckIcon />
                <Typography variant="body2" ml={3}>
                  {benefit}
                </Typography>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 8 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ transform: "scale(1.05)" }}
              href="/pricing">
              Get started with a free trial
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{ transform: "scale(1.05)", mx: 2 }}>
              Send us a message
            </Button>
          </Box>
          <Typography variant="body2" align="center">
            <Link to="/pricing" style={{ textDecoration: "none" }}>
              See our pricing →
            </Link>
          </Typography>
        </Container>
      </Box>
    </main>
  );
};

export default LandingPage;

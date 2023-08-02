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
  Avatar,
} from "@mui/material";
import { Tooltip, Paper } from "@mui/material";

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

import React from "react";

const CheckCircleIcon = (props) => (
  <SvgIcon {...props}>
    <path
      fill="none"
      d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
    />
    <path d="M216.32 334.44l114.45-69.14a10.89 10.89 0 000-18.6l-114.45-69.14a10.78 10.78 0 00-16.32 9.31v138.26a10.78 10.78 0 0016.32 9.31z" />
  </SvgIcon>
);

const CTASubscribe = () => {
  const FeatureItem = ({ text }) => (
    <Box display="flex" alignItems="center" mb={2}>
      <CheckCircleIcon color="primary" sx={{ mr: 1 }} />
      <Typography variant="body1">{text}</Typography>
    </Box>
  );

  return (
    <Box bgcolor="dark" py={12} position="relative" overflow="hidden">
      <Container>
        <Grid container justifyContent="center">
          <Grid item lg={7} md={8}>
            <Box textAlign="center" zIndex={2}>
              <Typography variant="h5" color="warning">
                Let's Try! Get Free Support
              </Typography>
              <Typography variant="h4">Start Your 14-Day Free Trial</Typography>
              <Typography variant="body1" mt={2}>
                We can help you to create your dream website for better business
                revenue.
              </Typography>
              <Box mt={5}>
                <Button variant="contained" color="primary" href="/contact-us">
                  Contact with Us
                </Button>
                <Button
                  color="inherit"
                  startIcon={
                    <SvgIcon>
                      <path
                        fill="none"
                        d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
                      />
                    </SvgIcon>
                  }
                  href="#!"
                  sx={{ ml: 3, mt: 2 }}>
                  Watch Demo
                </Button>
              </Box>
              <Box mt={4}>
                <FeatureItem text="Free 14-day trial" />
                <FeatureItem text="No credit card required" />
                <FeatureItem text="Support 24/7" />
                <FeatureItem text="Cancel anytime" />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box
        bgcolor="dark.light"
        borderRadius="50%"
        position="absolute"
        left="5%"
        top="30%"
        width="100px"
        height="100px"
      />
      <Box
        bgcolor="warning"
        borderRadius="50%"
        position="absolute"
        right="5%"
        top="10%"
        width="150px"
        height="150px"
      />
    </Box>
  );
};

const HeroSection = () => {
  return (
    <Box
      sx={{
        pt: "120px",
        pb: "120px",
        position: "relative",
        overflow: "hidden",
        backgroundImage: "url('/shape/color-particles-2.svg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top",
      }}>
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center">
          <Box width={{ xs: 1, md: 8 / 12, lg: 10 / 12 }} mb={5}>
            <Typography variant="h3" fontWeight="bold">
              Single Dashboard for All your Business Needs
            </Typography>
            <Typography variant="subtitle1" mt={2}>
              Uniquely network business experiences for resource sucking
              solutions. Dynamically re-engineer cooperative networks via
              cross-media expertise.
            </Typography>
            <Box mt={4}>
              <Button
                variant="contained"
                color="primary"
                href="/request-demo"
                sx={{ mr: 3 }}>
                Start a Free Trial
              </Button>
              <Button variant="outlined" color="primary" href="/contact-us">
                Talk to Sales
              </Button>
            </Box>
          </Box>
          <Box width={{ xs: 1, md: 9 / 12 }}>
            <Box position="relative">
              <img
                src="/screen/widget-3.png"
                alt="widget-img"
                style={{
                  position: "absolute",
                  boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                  borderRadius: "10px",
                }}
              />
              <img
                src="/screen/widget-4.png"
                alt="widget-img"
                style={{
                  position: "absolute",
                  boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                  borderRadius: "10px",
                }}
              />
              <img
                src="/dashboard-img.png"
                alt="dashboard-img"
                style={{
                  position: "relative",
                  borderRadius: "10px",
                  marginTop: "5px",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
      <Box
        sx={{
          backgroundColor: "dark",
          position: "absolute",
          bottom: 0,
          height: "25%",
          left: 0,
          right: 0,
          zIndex: -1,
          py: 5,
        }}></Box>
    </Box>
  );
};

const IntegrationSection = () => {
  const IntegrationItem = ({ imgSrc, tooltipTitle, href }) => (
    <Tooltip title={tooltipTitle}>
      <Box component="a" href={href} mx={1}>
        <Avatar src={imgSrc} alt="integration" />
      </Box>
    </Tooltip>
  );

  const ConnectedApp = ({
    imgSrc,
    title,
    description,
    badgeText,
    badgeColor,
  }) => (
    <Paper
      elevation={3}
      sx={{ padding: "20px", borderRadius: "15px", position: "relative" }}>
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar
          src={imgSrc}
          alt="integration"
          sx={{ mr: 2, bgcolor: "grey.200" }}
        />
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Typography variant="body1">{description}</Typography>
      <Box
        position="absolute"
        top={1}
        right={1}
        px={3}
        py={1}
        bgcolor={badgeColor}
        color="white"
        borderRadius="10px">
        {badgeText}
      </Box>
    </Paper>
  );

  return (
    <Box py={12}>
      <Container>
        <Grid container alignItems="center" spacing={3}>
          <Grid item lg={3}>
            <Box display="flex" flexDirection="column" alignItems="center">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <IntegrationItem
                  key={num}
                  imgSrc={`/integations/${num}.png`}
                  tooltipTitle="Your Brand Name"
                  href="/integration-single"
                />
              ))}
            </Box>
          </Grid>
          <Grid item lg={6} xs={12}>
            <Box textAlign="center" my={5}>
              <Typography variant="h5" color="primary">
                Integration
              </Typography>
              <Typography variant="h4">
                We Collaborate with Top Software Company
              </Typography>
              <Button
                variant="contained"
                color="primary"
                href="/integrations"
                sx={{ mt: 2 }}>
                View all Integration
              </Button>
            </Box>
          </Grid>
          <Grid item lg={3}>
            <Box display="flex" flexDirection="column" alignItems="center">
              {[7, 8, 9, 10, 11, 12].map((num) => (
                <IntegrationItem
                  key={num}
                  imgSrc={`/integations/${num}.png`}
                  tooltipTitle="Your Brand Name"
                  href="/integration-single"
                />
              ))}
            </Box>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" mt={10} spacing={3}>
          <Grid item lg={5} md={12}>
            <ConnectedApp
              imgSrc="/integations/4.png"
              title="Google Drive"
              description="Competently generate unique e-services and client-based models. Globally engage tactical niche."
              badgeText="Connect"
              badgeColor="primary.light"
            />
          </Grid>
          <Grid item lg={5} md={12}>
            <ConnectedApp
              imgSrc="/integations/9.png"
              title="Google Drive"
              description="Globally engage tactical niche markets rather than client-based competently generate services."
              badgeText="Connected"
              badgeColor="error.light"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

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

      <iframe
        height="800px"
        id="64c847f8963a1e52fdec7670"
        src="http://localhost:8080/api/users/64c842c6963a1e52fdec757e/products/64c8445b963a1e52fdec7585/widgets/64c847f8963a1e52fdec7670/serve?hideDate=on&scrollSpeed=1&type=masonry_scroll"
        frameBorder="0"
        scrolling="no"
        width="100%"></iframe>
      <iframe
        height="800px"
        id="64c8480a963a1e52fdec7673"
        src="http://localhost:8080/api/users/64c842c6963a1e52fdec757e/products/64c8445b963a1e52fdec7585/widgets/64c8480a963a1e52fdec7673/serve?type=masonry_fix"
        frameBorder="0"
        scrolling="no"
        width="100%"></iframe>
      <iframe
        height="800px"
        id="64c8481c963a1e52fdec7676"
        src="http://localhost:8080/api/users/64c842c6963a1e52fdec757e/products/64c8445b963a1e52fdec7585/widgets/64c8481c963a1e52fdec7676/serve?hideDate=on&autoScroll=on&type=carousel"
        frameBorder="0"
        scrolling="no"
        width="100%"></iframe>
      <iframe
        height="800px"
        id="64c8f3d61cb118bc248771a3"
        src="http://localhost:8080/api/users/64c8f36b1cb118bc24877150/products/64c8f3771cb118bc24877157/widgets/64c8f3d61cb118bc248771a3/serve?type=collect-feedback"
        frameBorder="0"
        scrolling="no"
        width="100%"></iframe>
    </main>
  );
};

export default LandingPage;

import React from "react";
import { Box, Container, Grid, Link, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      py={4}
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        color: (theme) => theme.palette.text.secondary,
      }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">
              Feedio © 2023. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Connect with us:</Typography>
            <Link
              href="https://www.facebook.com/cleanlynn"
              target="_blank"
              rel="noopener"
              color="inherit">
              Facebook
            </Link>
            |
            <Link
              href="https://twitter.com/cleanlynn"
              target="_blank"
              rel="noopener"
              color="inherit">
              Twitter
            </Link>{" "}
            |
            <Link
              href="https://www.instagram.com/cleanlynn"
              target="_blank"
              rel="noopener"
              color="inherit">
              Instagram
            </Link>{" "}
            |
            <Link
              href="https://www.linkedin.com/company/cleanlynn"
              target="_blank"
              rel="noopener"
              color="inherit">
              LinkedIn
            </Link>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Get in touch:</Typography>
            <Typography>Email: support@feddio.com</Typography>
            <Typography>Phone: +1 (800) 123-4567</Typography>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Link href="/terms-of-service" color="inherit">
            Terms of Service
          </Link>{" "}
          |
          <Link href="/privacy-policy" color="inherit">
            Privacy Policy
          </Link>{" "}
          |
          <Link href="/about-us" color="inherit">
            About Us
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

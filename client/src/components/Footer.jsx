import React from "react";
import {
  Box,
  Container,
  Grid,
  Link,
  Typography,
  IconButton,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      py={4}
      sx={
        {
          // backgroundColor: (theme) => theme.palette.gradients.top,
          // borderColor: (theme) => theme.palette.divider,
          // color: (theme) => theme.palette.text.secondary,
        }
      }>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">
              Feedio © 2023. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Connect with us:</Typography>
            <Box sx={{ display: "flex", gap: "16px", mt: 1 }}>
              <Link
                href="https://www.facebook.com/cleanlynn"
                target="_blank"
                rel="noopener">
                <IconButton>
                  <Facebook color="secondary" />
                </IconButton>
              </Link>
              <Link
                href="https://twitter.com/cleanlynn"
                target="_blank"
                rel="noopener">
                <IconButton>
                  <Twitter color="secondary" />
                </IconButton>
              </Link>
              <Link
                href="https://www.instagram.com/cleanlynn"
                target="_blank"
                rel="noopener">
                <IconButton>
                  <Instagram color="secondary" />
                </IconButton>
              </Link>
              <Link
                href="https://www.linkedin.com/company/cleanlynn"
                target="_blank"
                rel="noopener">
                <IconButton>
                  <LinkedIn color="secondary" />
                </IconButton>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Get in touch:</Typography>
            <Typography>Email: support@feddio.com</Typography>
            <Typography>Phone: +1 (800) 123-4567</Typography>
          </Grid>
        </Grid>
        <Box
          mt={4}
          sx={{ display: "flex", justifyContent: "center", gap: "16px" }}>
          <Link href="/terms-of-service" color="inherit">
            Terms of Service
          </Link>
          <Link href="/privacy-policy" color="inherit">
            Privacy Policy
          </Link>
          <Link href="/about-us" color="inherit">
            About Us
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

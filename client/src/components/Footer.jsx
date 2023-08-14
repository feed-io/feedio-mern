import React from "react";
import {
  Box,
  Container,
  Grid,
  Link,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

import Logo from "../assets/logo.svg";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      py={4}
      sx={{
        backgroundColor: theme.palette.success.main,
      }}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} md={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img src={Logo} alt="Feedio Logo" style={{ width: "40px" }} />
              <Typography
                variant="h6"
                color={theme.palette.primary.contrastText}>
                Feedio © 2023. All rights reserved.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" color={theme.palette.primary.contrastText}>
              Connect with us:
            </Typography>
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
          <Grid item xs={12} md={3}>
            <Typography variant="h6" color={theme.palette.primary.contrastText}>
              Quick Links:
            </Typography>
            <Box mt={2}>
              <Link
                href="/terms-of-service"
                color={theme.palette.primary.contrastText}
                underline="none">
                Terms of Service
              </Link>
              <br />
              <Link
                href="/privacy-policy"
                color={theme.palette.primary.contrastText}
                underline="none">
                Privacy Policy
              </Link>
              <br />
              <Link
                href="/about-us"
                color={theme.palette.primary.contrastText}
                underline="none">
                About Us
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" color={theme.palette.primary.contrastText}>
              Get in touch:
            </Typography>
            <Typography color={theme.palette.primary.contrastText}>
              Email: support@feddio.com
            </Typography>
            <Typography color={theme.palette.primary.contrastText}>
              Phone: +1 (800) 123-4567
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;

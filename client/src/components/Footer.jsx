import React from "react";
import {
  Box,
  Container,
  Grid,
  Link,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { LinkedIn } from "@mui/icons-material";

import Logo from "../assets/logo.svg";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Box
      component="footer"
      py={4}
      sx={{
        backgroundColor: theme.palette.success.main,
      }}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}>
              <img src={Logo} alt="Feedio Logo" style={{ width: "40px" }} />
              <Typography
                variant="h6"
                color={theme.palette.primary.contrastText}>
                Feedio © 2023. All rights reserved.
              </Typography>
              {isMobile && (
                <Typography
                  variant="body2"
                  color={theme.palette.primary.contrastText}>
                  Made in the European Union 🇪🇺
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
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
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color={theme.palette.primary.contrastText}>
              Get in touch:
            </Typography>
            <Link
              href="https://www.linkedin.com/company/feedio"
              target="_blank"
              rel="noopener">
              <IconButton>
                <LinkedIn color="secondary" />
              </IconButton>
            </Link>
            <Typography color={theme.palette.primary.contrastText}>
              Email: support@feddio.app
            </Typography>
          </Grid>
        </Grid>
        {!isMobile && (
          <Typography
            variant="body2"
            color={theme.palette.primary.contrastText}
            align="center"
            mt={2}>
            Made in the EU 🇪🇺
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default Footer;

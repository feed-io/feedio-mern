import React from "react";
import { Container, Typography, Box } from "@material-ui/core";

const HeaderSection = () => {
  return (
    <Container maxWidth="lg">
      <Box py={8}>
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Simple, Transparent Pricing
        </Typography>
        <Typography variant="h6" component="p" align="center" gutterBottom>
          Choose the plan that best fits your needs and start growing your
          business with our powerful features.
        </Typography>
      </Box>
    </Container>
  );
};

export default HeaderSection;

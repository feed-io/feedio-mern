import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";

const CTASection = () => {
  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py={8}>
        <Box>
          <Typography variant="h4" component="h2" gutterBottom>
            Start Building Trust with Your Wall of Love
          </Typography>
          <Typography variant="h6" component="p" gutterBottom>
            Experience the power of customer testimonials and let your Wall of
            Love speak for your brand.
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Create Your Wall Now
          </Button>
        </Box>
        <Box>
          <img src="your-image-url" alt="Call to Action Image" />
        </Box>
      </Box>
    </Container>
  );
};

export default CTASection;

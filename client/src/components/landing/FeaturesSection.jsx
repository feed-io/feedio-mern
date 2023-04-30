import React from "react";
import { Container, Typography, Box, Grid } from "@mui/material";
// import "./App.css";

const FeaturesSection = () => {
  return (
    <Container maxWidth="lg">
      <Box py={8}>
        <Typography variant="h4" component="h2" gutterBottom>
          Why Choose Testimonia.ly for Your Wall of Love?
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <img src="your-image-url" alt="Feature 1 Image" />
            <Typography variant="h6" component="h3" gutterBottom>
              Effortless Integration
            </Typography>
            <Typography>
              Easily collect and showcase testimonials from various sources with
              our seamless integration options.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <img src="your-image-url" alt="Feature 2 Image" />
            <Typography variant="h6" component="h3" gutterBottom>
              Customizable Design
            </Typography>
            <Typography>
              Personalize your Wall of Love with our flexible design options to
              match your brand's unique style.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <img src="your-image-url" alt="Feature 3 Image" />
            <Typography variant="h6" component="h3" gutterBottom>
              Powerful Analytics
            </Typography>
            <Typography>
              Measure your Wall of Love's impact with in-depth analytics that
              reveal insights about customer engagement.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default FeaturesSection;

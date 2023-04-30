import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
// import "./App.css";

const HeaderSection = () => {
  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        minHeight="80vh">
        <Box>
          <Typography variant="h2" component="h1" gutterBottom>
            Share the Love with Testimonia.ly
          </Typography>
          <Typography variant="h6" component="p" gutterBottom>
            Showcase your customer success stories and build trust with our
            beautifully designed Wall of Love.
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Get Started for Free
          </Button>
        </Box>
        <Box>
          <img src="your-image-url" alt="Header Image" />
        </Box>
      </Box>
    </Container>
  );
};

export default HeaderSection;

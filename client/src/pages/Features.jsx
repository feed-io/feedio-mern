import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

const FeaturesPage = () => {
  return (
    <Container>
      <Box my={5}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5">Wall of Love Widget</Typography>
            <Typography>
              Showcase glowing testimonials from your customers with the Wall of
              Love widget, perfect for building trust and attracting new
              clients.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h5">
              Effortless Testimonial Collection
            </Typography>
            <Typography>
              Easily collect and manage customer testimonials in one place,
              making it simple to keep your Wall of Love up-to-date.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h5">Customizable Design</Typography>
            <Typography>
              Personalize the appearance of your Wall of Love widget to match
              your brand's look and feel, ensuring a seamless user experience.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default FeaturesPage;

import React from "react";
import { Container, Typography, Box, Grid } from "@mui/material";

const FeaturesSection = () => {
  return (
    <Container maxWidth="lg">
      <Box py={8}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold" }}>
          Why Choose Testimonia.ly for Your Wall of Love?
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: "Effortless Integration",
              description:
                "Easily collect and showcase testimonials from various sources with our seamless integration options.",
            },
            {
              title: "Customizable Design",
              description:
                "Personalize your Wall of Love with our flexible design options to match your brand's unique style.",
            },
            {
              title: "Powerful Analytics",
              description:
                "Measure your Wall of Love's impact with in-depth analytics that reveal insights about customer engagement.",
            },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyLTYr1mEDHKHvJ1WFA4FH-8v9D7n1I03wWg&usqp=CAU"
                  alt={`Feature ${index + 1}`}
                  style={{ borderRadius: "16px" }}
                />
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}>
                  {feature.title}
                </Typography>
                <Typography>{feature.description}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default FeaturesSection;

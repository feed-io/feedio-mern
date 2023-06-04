import React from "react";
import { Container, Typography, Button, Box } from "@material-ui/core";

const CTASection = () => {
  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py={8}>
        <Box>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrQiX4ELo5VzbWMbWxQV3VpUibCQfLK1RKsw&usqp=CAU"
            alt=""
            style={{ borderRadius: "16px" }}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-end">
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ fontWeight: "bold" }}>
            Start Building Trust with Your Wall of Love
          </Typography>
          <Typography
            variant="h6"
            component="p"
            gutterBottom
            sx={{ color: "gray" }}>
            Experience the power of customer testimonials and let your Wall of
            Love speak for your brand.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              padding: "12px 36px",
              borderRadius: "24px",
              fontWeight: "600",
            }}>
            Create Your Wall Now
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CTASection;

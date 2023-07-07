import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";

const HeaderSection = () => {
  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        minHeight="80vh">
        <Box>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold" }}>
            Share the Love with Feedio
          </Typography>
          <Typography
            variant="h6"
            component="p"
            gutterBottom
            sx={{ color: "gray" }}>
            Showcase your customer success stories and build trust with our
            beautifully designed Show Room page.
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
            Get Started for Free
          </Button>
        </Box>
        <Box>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmGac4rHQocj96nrvEi7E19quDVfoOgdWGDg&usqp=CAU"
            alt="Header "
            style={{ borderRadius: "16px" }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default HeaderSection;

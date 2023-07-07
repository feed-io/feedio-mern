import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { styled } from "@mui/system";

const StyledImage = styled("img")({
  borderRadius: "16px",
});

const HeaderTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  color: theme.palette.text.primary,
}));

const BodyTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: "12px 36px",
  borderRadius: "24px",
  fontWeight: "600",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.primary.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.background.default,
  },
}));

const CTASection = () => {
  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py={8}>
        <Box>
          <StyledImage
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrQiX4ELo5VzbWMbWxQV3VpUibCQfLK1RKsw&usqp=CAU"
            alt=""
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-end">
          <HeaderTypography variant="h4" component="h2" gutterBottom>
            Start Building Trust with your Show Room
          </HeaderTypography>
          <BodyTypography variant="h6" component="p" gutterBottom>
            Experience the power of customer testimonials and let your Show Room
            speak for your brand.
          </BodyTypography>
          <StyledButton variant="contained" size="large">
            Create Your Show Room Now
          </StyledButton>
        </Box>
      </Box>
    </Container>
  );
};

export default CTASection;

import React from "react";
import { Container, Typography, Button, Box, Grid } from "@mui/material";
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

const FeaturesSection = () => {
  return (
    <Container maxWidth="lg">
      <Box py={8}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold" }}>
          Why Choose Feedio for Show Room?
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

const LandingPage = () => {
  return (
    <div>
      <HeaderSection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
};

export default LandingPage;

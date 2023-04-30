import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@mui/material";

const PricingTiersSection = () => {
  const tiers = [
    {
      title: "Basic",
      price: "9.99",
      features: ["3 Walls of Love", "Basic Customization", "Email Support"],
      buttonText: "Get Started",
    },
    {
      title: "Pro",
      price: "19.99",
      features: [
        "Unlimited Walls of Love",
        "Advanced Customization",
        "Priority Email Support",
      ],
      buttonText: "Try for Free",
    },
    {
      title: "Enterprise",
      price: "Custom",
      features: ["Custom Solutions", "Dedicated Support", "Advanced Analytics"],
      buttonText: "Contact Us",
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box py={8}>
        <Grid container spacing={4}>
          {tiers.map((tier) => (
            <Grid item key={tier.title} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h3"
                    align="center"
                    gutterBottom>
                    {tier.title}
                  </Typography>
                  <Typography variant="h4" component="h2" align="center">
                    {tier.price}
                    {tier.price !== "Custom" && <span>/mo</span>}
                  </Typography>
                  <Box mt={4}>
                    {tier.features.map((feature, index) => (
                      <Typography key={index}>{feature}</Typography>
                    ))}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained" color="primary">
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default PricingTiersSection;

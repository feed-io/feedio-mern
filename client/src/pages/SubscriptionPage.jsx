import React, { useContext, useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  CardHeader,
  Container,
  Box,
} from "@mui/material";
import { Star, Cancel, Payment } from "@mui/icons-material";

import { AuthContext } from "../context/auth-context";

const tiers = [
  {
    title: "Free",
    price: "0",
    description: [
      "1 space",
      "10 text reviews in total",
      "Limited 3rd-party imports",
      "Public Show Room page",
      "Public Feedback page",
      "Show Room with our logo",
    ],
    buttonText: "Sign up for free",
    buttonVariant: "outlined",
  },

  {
    title: "Premium",
    subheader: "Most popular",
    price: "10",
    description: [
      "Everything in Starter",
      " 1 space",
      "Unlimited text reviews",
      "Unlimited tags",
      " Remove our branding from all widgets",
      "Custom domain (SSL)",
    ],
    buttonText: "Free trial",
    buttonVariant: "contained",
  },
  {
    title: "Plus",
    price: "30",
    description: [
      "Everything in Plus",
      "2 to 10 spaces",
      "Unlimited text reviews",
      "REST API",
      "Webhook",
      "Zapier and Make integrations",
    ],
    buttonText: "Contact us",
    buttonVariant: "outlined",
  },
];

const SubscriptionPage = () => {
  const auth = useContext(AuthContext);
  const { userId, token, membershipStatus } = auth;
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleCheckout = async (plan) => {
    if (plan === "Free") {
      navigate("/dashboard");
    } else {
      const response = await axios.post(
        `http://localhost:8080/api/users/${userId}/payments/create-checkout-session`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.data && response.data.id) {
        const { id } = response.data;
        const stripe = window.Stripe(
          "pk_test_51NS5wyCbn1CFQkB8htl9FOMk96NaBH1os6POnhCtrvd1kvwkslsGKyz9aevuvRKIZxDlLnqPA1ofvHxdy41D8Gum00X6521Cyl"
        );
        await stripe.redirectToCheckout({ sessionId: id });
      }
    }
  };

  const handleUnsubscribe = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/users/${userId}/payments/cancel-subscription`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 200) {
        auth.updateMembershipStatus("free");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleManageBilling = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/users/${userId}/payments/create-customer-portal-session`,
        {},
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );

      console.log(response);
      if (response.data && response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${userId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.data && response.data.user) {
          setEmail(response.data.user.email);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, [userId, token]);

  return (
    <Container>
      <Box
        sx={{
          mt: 8,
          mb: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}>
        <Typography variant="h4" gutterBottom>
          Subscription Plan
        </Typography>
        <Typography variant="body1" gutterBottom>
          Hi {email}
        </Typography>
        <Typography variant="body1" gutterBottom>
          You are currently on the {membershipStatus} plan
        </Typography>
        {membershipStatus === "free" ? (
          <Grid container spacing={5} alignItems="flex-end">
            {tiers.map((tier) => (
              <Grid item key={tier.title} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: "center" }}
                    action={tier.title === "Pro" ? <Star /> : null}
                    subheaderTypographyProps={{ align: "center" }}
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                          ? theme.palette.grey[200]
                          : theme.palette.grey[700],
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "baseline",
                        mb: 2,
                      }}>
                      <Typography
                        component="h2"
                        variant="h3"
                        color="text.primary">
                        €{tier.price}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        /mo
                      </Typography>
                    </Box>
                    <ul>
                      {tier.description.map((line) => (
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="center"
                          key={line}>
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                  <CardActions sx={{ mt: "auto" }}>
                    <Button
                      fullWidth
                      variant={tier.buttonVariant}
                      onClick={() => handleCheckout(tier.title)}>
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              mt: 4,
            }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Payment />}
              onClick={handleManageBilling}
              sx={{ mt: 2 }}>
              Manage Billing
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Cancel />}
              onClick={handleUnsubscribe}
              sx={{ mt: 2 }}>
              Unsubscribe
            </Button>
          </Box>
        )}
        <Button
          variant="contained"
          color="secondary"
          component={RouterLink}
          to="/dashboard"
          sx={{ mt: 4 }}>
          Go to Dashboard
        </Button>
      </Box>
    </Container>
  );
};

export default SubscriptionPage;

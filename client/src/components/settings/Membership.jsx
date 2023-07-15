import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const tiers = [
  {
    title: "Free",
    price: "0€",
    description: ["1 space", "3 reviews"],
    buttonText: "Get started",
    buttonVariant: "outlined",
  },
  {
    title: "Premium",
    subheader: "Most popular",
    price: "10€",
    description: ["5 spaces", "20 reviews", "Priority email support"],
    buttonText: "Free trial",
    buttonVariant: "contained",
  },
];

const AccountDashboard = () => {
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
    <StyledBox>
      <Typography variant="h4" gutterBottom>
        Account Dashboard
      </Typography>
      <Typography variant="body1" gutterBottom>
        Hi {email}
      </Typography>

      {membershipStatus === "free" ? (
        <Grid container spacing={4}>
          {tiers.map((tier) => (
            <Grid item xs={12} sm={6} md={4} key={tier.title}>
              <Card>
                <CardContent>
                  <Typography variant="h5" color="text.secondary">
                    {tier.title}
                  </Typography>
                  <Typography variant="h2">{tier.price}</Typography>
                  {tier.description.map((desc, index) => (
                    <Typography key={index}>{desc}</Typography>
                  ))}
                </CardContent>
                <CardActions>
                  <StyledButton
                    variant="contained"
                    color="secondary"
                    onClick={() => handleCheckout(tier.title)}>
                    {tier.buttonText}
                  </StyledButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <div>
          <Typography variant="body1" gutterBottom>
            You are currently on the {membershipStatus} plan
          </Typography>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={handleManageBilling}>
            Manage Billing
          </StyledButton>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={handleUnsubscribe}>
            Unsubscribe
          </StyledButton>
        </div>
      )}
      <Button
        variant="contained"
        color="secondary"
        component={RouterLink}
        to="/dashboard">
        Go to Dashboard
      </Button>
    </StyledBox>
  );
};

export default AccountDashboard;

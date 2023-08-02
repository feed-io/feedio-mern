import React, { useEffect, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { Button, Container, Typography, Box } from "@mui/material";

import { AuthContext } from "../context/auth-context";

const Success = () => {
  const auth = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/${auth.userId}`, {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      })
      .then((response) => {
        auth.updateMembershipStatus(response.data.user.membershipStatus);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [auth]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}>
      <Typography variant="h4" gutterBottom>
        Payment Successful
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Thank you for your purchase! You now have access to all premium
        features.
      </Typography>
      <Box mt={4}>
        <Button
          variant="contained"
          color="secondary"
          component={RouterLink}
          to="/dashboard">
          Home
        </Button>
      </Box>
    </Container>
  );
};

export default Success;

import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Container, Typography, Box } from "@mui/material";

const CancelationPage = () => (
  <Container
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "80vh",
    }}>
    <Typography variant="h4" gutterBottom>
      Payment Cancelled
    </Typography>
    <Typography variant="body1" align="center" gutterBottom>
      You have not been charged. Please try again or contact support if you need
      help.
    </Typography>
    <Box mt={4}>
      <Button
        variant="contained"
        color="secondary"
        component={RouterLink}
        to="/dashboard">
        Go to Dashboard
      </Button>
    </Box>
  </Container>
);

export default CancelationPage;

import React, { useState } from "react";
import { Container, Box, Button, useTheme } from "@mui/material";
import Login from "../components/Login";
import SignUp from "../components/Signup";
import Logo from "../assets/logo.svg";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const theme = useTheme();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Container
      maxWidth="sm"
      style={{ marginTop: theme.spacing(8), marginBottom: theme.spacing(8) }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: theme.palette.success.contrastText,
          padding: theme.spacing(4),
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[3],
        }}>
        <img
          src={Logo}
          alt="Logo"
          style={{
            width: "100px",
            height: "100px",
            marginBottom: theme.spacing(2),
          }}
        />

        {isLogin ? <Login /> : <SignUp />}

        <Button
          color="primary"
          onClick={toggleAuthMode}
          sx={{ marginTop: theme.spacing(2) }}>
          {isLogin
            ? "Need an account? Sign up"
            : "Already have an account? Login"}
        </Button>
      </Box>
    </Container>
  );
};

export default AuthPage;

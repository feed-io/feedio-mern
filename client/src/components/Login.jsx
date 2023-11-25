import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Avatar,
  Box,
  Snackbar,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { VpnKey, Close } from "@mui/icons-material/";

import { AuthContext } from "../context/auth-context";
import useValidation from "../hooks/validation-hook";

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "https://api.feedio.app";

const Login = (props) => {
  const { values, errors, handleChange } = useValidation();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { handleClose } = props;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/users/login`,
        values,
        { headers: { "Content-Type": "application/json" } }
      );

      auth.login(
        response.data.userId,
        response.data.token,
        response.data.membershipStatus
      );
      navigate("/dashboard");
      handleClose();
      setSnackbarMessage("Successfully logged in!");
      setSnackbarOpen(true);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setSnackbarMessage(error.response.data.message);
      } else {
        setSnackbarMessage("Login failed. Please try again.");
      }
      setSnackbarOpen(true);
    }
  };

  const handleForgotPasswordClick = () => {
    console.log("Forgot Password clicked");
  };

  return (
    <Container component="main" maxWidth={isMobile ? "sm" : "xs"}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        {/* FeedioLogo Section */}

        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <VpnKey />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontSize: isMobile ? "1.2rem" : "1.5rem" }}>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          {/* <Box sx={{ padding: "10px" }}>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
          </Box> */}
          <Box sx={{ padding: "10px" }}>
            <Button type="submit" variant="primary">
              Login
            </Button>
          </Box>
          <Grid container>
            <Grid item xs>
              <Button
                onClick={handleForgotPasswordClick}
                sx={{
                  textTransform: "none",
                  textDecoration: "none",
                  color: "inherit",
                  "&:hover": {
                    textDecoration: "none",
                    backgroundColor: "transparent",
                  },
                }}>
                Forgot password?
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={() => setSnackbarOpen(false)}>
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </Container>
  );
};

export default Login;

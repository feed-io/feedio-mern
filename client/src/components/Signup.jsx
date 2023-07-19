import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Avatar,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";

import { AuthContext } from "../context/auth-context";
import useValidation from "../hooks/validation-hook";

const SignUp = (props) => {
  const { values, errors, handleChange } = useValidation();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { handleClose } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    try {
      const response = await axios.post(
        "https://feedio-server.vercel.app/api/users/register",
        values,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response);
      auth.login(
        response.data.userId,
        response.data.token,
        response.data.membershipStatus
      );
      navigate("/dashboard");
      handleClose();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="username"
                label="Username"
                value={values.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                autoFocus
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={values.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="passwordConfirm"
                label="Confirm Password"
                type="password"
                id="passwordConfirm"
                autoComplete="new-password"
                value={values.passwordConfirm}
                onChange={handleChange}
                error={!!errors.passwordConfirm}
                helperText={errors.passwordConfirm}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ padding: "10px" }}>
                <FormControlLabel
                  control={
                    <Box sx={{ padding: "5px" }}>
                      <Checkbox value="allowExtraEmails" color="primary" />
                    </Box>
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ padding: "10px" }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;

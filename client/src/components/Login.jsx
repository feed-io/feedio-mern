import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { VpnKey } from "@mui/icons-material/";

import { AuthContext } from "../context/auth-context";
import useValidation from "../hooks/validation-hook";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
console.log(SERVER_URL);
const Login = (props) => {
  const { values, errors, handleChange } = useValidation();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { handleClose } = props;

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
    } catch (error) {
      console.log(error);
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
        {/* FeedioLogo Section */}

        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <VpnKey />
        </Avatar>
        <Typography component="h1" variant="h5">
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
          <Box sx={{ padding: "10px" }}>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
          </Box>
          <Box sx={{ padding: "10px" }}>
            <Button type="submit" variant="primary">
              Login
            </Button>
          </Box>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

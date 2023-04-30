// src/components/SignUp.js
import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // Handle success (e.g., navigate to another page, display a success message, etc.)
      console.log(response);
    } catch (error) {
      // Handle error (e.g., display an error message, etc.)
      console.log(error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5">Sign Up</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="username"
              label="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SignUp;

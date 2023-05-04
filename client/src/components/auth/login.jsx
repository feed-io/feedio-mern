// src/components/Login.js
import React, { useState, useContext } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";

const Login = (props) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { handleClose } = props;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      auth.login(response.data.userId, response.data.token);
      navigate("/profile");
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5">Login</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
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
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;

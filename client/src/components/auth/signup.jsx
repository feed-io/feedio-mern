// src/components/SignUp.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import axios from "axios";
import { AuthContext } from "../../context/auth-context";
import Avatar from "@material-ui/core/Avatar";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";

import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const SignUp = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

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
        "http://localhost:8080/api/users/register",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(formData);
      auth.login(response.data.userId, response.data.token);
      navigate("/dashboard");
      handleClose();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    // <Container maxWidth="xs">
    //   <Typography variant="h5">Sign Up</Typography>
    //   <form onSubmit={handleSubmit}>
    //     <Grid container spacing={2}>
    //       <Grid item xs={12}>
    //         <TextField
    //           required
    //           fullWidth
    //           name="username"
    //           label="Username"
    //           value={formData.username}
    //           onChange={handleChange}
    //         />
    //       </Grid>
    //       <Grid item xs={12}>
    //         <TextField
    //           required
    //           fullWidth
    //           name="email"
    //           label="Email"
    //           type="email"
    //           value={formData.email}
    //           onChange={handleChange}
    //         />
    //       </Grid>
    //       <Grid item xs={12}>
    //         <TextField
    //           required
    //           fullWidth
    //           name="password"
    //           label="Password"
    //           type="password"
    //           value={formData.password}
    //           onChange={handleChange}
    //         />
    //       </Grid>
    //       <Grid item xs={12}>
    //         <Button type="submit" fullWidth variant="contained" color="primary">
    //           Sign Up
    //         </Button>
    //       </Grid>
    //     </Grid>
    //   </form>
    // </Container>
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
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

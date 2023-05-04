import React, { useEffect, useState, useContext } from "react";
import { Container, Typography, Box, Paper, Grid } from "@mui/material";
import axios from "axios";

import { AuthContext } from "../context/auth-context";

const Profile = () => {
  const [company, setCompany] = useState([]);
  const [content, setContent] = useState(""); // Add a new state for content
  const auth = useContext(AuthContext);

  useEffect(() => {
    const loadCompanyData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${auth.userId}`,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );
        setContent(response.data.user.company); // Set the content state
        console.log(content);
      } catch (error) {
        console.log("Error fetching testimonials data:", error);
      }
    };
    loadCompanyData();
  }, []);

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          {content}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Welcome to your company profile. Here you can see the testimonials
          submitted by your clients.
        </Typography>
        <Grid container spacing={3}>
          {company.map((testimonial) => (
            <Grid item xs={12} md={4} key={testimonial.id}>
              <Paper elevation={3} style={{ padding: "1rem" }}>
                <Typography variant="h6" component="h2">
                  {testimonial.author}
                </Typography>
                <Typography variant="body2">{testimonial.content}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile;

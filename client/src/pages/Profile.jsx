import React, { useEffect, useState, useContext } from "react";
import { Typography, Box, Button, Fab, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import axios from "axios";

import { AuthContext } from "../context/auth-context";

export default function ProfilePage() {
  const [content, setContent] = useState("");
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
        console.log(response.data.user);
        setContent(response.data.user.email); // Set the content state
      } catch (error) {
        console.log("Error fetching testimonials data:", error.message);
      }
    };
    loadCompanyData();
  }, []);

  return (
    <Container>
      <Box
        sx={{
          position: "fixed",
          right: 2,
          top: 2,
        }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SettingsIcon />}
          onClick={() => console.log("Navigate to settings page")}>
          Settings
        </Button>
      </Box>

      <Typography variant="h4" component="h1" sx={{ marginBottom: 2 }}>
        {auth.userId}
      </Typography>

      <Typography variant="h5" component="h2" sx={{ marginBottom: 4 }}>
        {content}
      </Typography>

      <Box>
        <Typography variant="h6" component="h3">
          Product Reviews Overview
        </Typography>
        {/* Add the product reviews overview component here */}
      </Box>

      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 4,
          right: 4,
        }}
        onClick={() => console.log("Create a new product review")}>
        <AddIcon />
      </Fab>
    </Container>
  );
}

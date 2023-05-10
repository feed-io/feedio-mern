import React, { useEffect, useState, useContext } from "react";
import { Typography, Box, Button, Container, Paper, Grid } from "@mui/material";
import axios from "axios";

import { AuthContext } from "../context/auth-context";
import Avatar from "../components/dashboardPage/Avatar";
import UpdateModal from "../components/dashboardPage/UpdateModal";
import DeleteModal from "../components/dashboardPage/DeleteModal";

export default function UserProfile() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const auth = useContext(AuthContext);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${auth.userId}`,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );
        console.log(response);
        setUser(response.data.user);
        setEmail(response.data.user.email);
        setUsername(response.data.user.username);
      } catch (error) {
        console.log("Error fetching user data:", error.message);
      }
    };
    loadData();
  }, []);

  const handleEditOpen = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleDeleteOpen = () => {
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          flexDirection: "column",
          gap: 4,
        }}>
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "0.5rem",
            }}>
            <Avatar user={user} sx={{ mb: 1 }} />
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" component="h3">
                Email: {email}
              </Typography>
              <Typography variant="subtitle1" component="h3">
                Username: {username}
              </Typography>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 4,
            }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditOpen}>
              Edit Profile
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDeleteOpen}>
              Delete Account
            </Button>
          </Box>
        </Paper>
        <UpdateModal onOpen={openEdit} onClose={handleEditClose} />
        <DeleteModal onOpen={openDelete} onClose={handleDeleteClose} />
      </Box>
    </Container>
  );
}

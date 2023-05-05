import React, { useEffect, useState, useContext } from "react";
import {
  Typography,
  Box,
  Button,
  Fab,
  TextField,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

import { AuthContext } from "../context/auth-context";

export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const auth = useContext(AuthContext);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [updatedEmail, setUpdatedEmail] = useState("");

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

        setEmail(response.data.user.email);
        setUsername(response.data.user.username);
      } catch (error) {
        console.log("Error fetching testimonials data:", error.message);
      }
    };
    loadCompanyData();
  }, []);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8080/api/users/${auth.userId}`,
        {
          email: updatedEmail,
        },
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );
      setEmail(updatedEmail);
      console.log(response);
      handleUpdateClose();
    } catch (error) {
      console.log("Error updating user:", error.message);
    }
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(
        `http://localhost:8080/api/users/${auth.userId}`,
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );
      console.log(response);
      handleUpdateClose();
    } catch (error) {
      console.log("Error deleting user:", error.message);
    }
  };

  const handleUpdateClick = () => {
    setOpenUpdate(true);
  };

  const handleUpdateClose = () => {
    setOpenUpdate(false);
  };

  const handleDeleteClick = () => {
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          flexDirection: "column",
          gap: 4,
        }}>
        <Typography variant="h4" component="h1" textAlign="center">
          {username}
        </Typography>
        <Typography variant="h5" component="h2" textAlign="center">
          {email}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
          }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateClick}>
            Update
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDeleteClick}>
            Delete Account
          </Button>
        </Box>
        <Typography variant="h6" component="h3" textAlign="center">
          Product Reviews Overview
        </Typography>
        {/* Add the product reviews overview component here */}
        REVIEWs
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
      </Box>
      {/* Update user dialog */}
      <Dialog open={openUpdate} onClose={handleUpdateClose}>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="New Email"
            value={updatedEmail}
            onChange={(e) => setUpdatedEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>Cancel</Button>
          <Button color="primary" onClick={handleUpdateSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete user dialog */}
      <Dialog open={openDelete} onClose={handleDeleteClose}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          {/* Add any email related to deleting the account here */}
          Are you sure you want to delete your account?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button color="secondary" onClick={handleDeleteSubmit}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

import React, { useEffect, useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  Avatar,
  Button,
  Container,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import axios from "axios";

import DeleteUserModal from "../components/DeleteUserModal";
import { AuthContext } from "../context/auth-context";

const UserProfilePage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [user, setUser] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const auth = useContext(AuthContext);

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
        setName(response.data.user.name);
      } catch (error) {
        console.log("Error fetching user data:", error.message);
      }
    };
    loadData();
  }, [auth.token, auth.userId]);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const updateData = {
      email: email,
      name: name,
    };
    if (newPassword) {
      updateData.password = newPassword;
    }
    try {
      await axios.put(
        `http://localhost:8080/api/users/${auth.userId}`,
        updateData, // Send the new password if it's provided
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );
    } catch (error) {
      console.log("Error updating user:", error.message);
    }
  };

  const handleDeleteOpen = () => {
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  return (
    <Container>
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Box
          mb={8}
          mt={8}
          sx={{
            width: { xs: "95%", sm: "90%", md: "80%", lg: "70%", xl: "60%" },
            maxWidth: 800,
            bg: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 1,
          }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold", mb: 4 }}>
              Profile
            </Typography>

            <Box
              sx={{ my: 4, borderBottom: "1px solid", borderColor: "divider" }}
            />

            <Box
              sx={{
                mt: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <Avatar
                alt={name}
                src={user.image}
                sx={{
                  width: { xs: 100, sm: 80 },
                  height: { xs: 100, sm: 80 },
                  mb: 2,
                }}
              />
              <input
                type="file"
                accept="image/*"
                name="newAvatarURL"
                id="newAvatarURL"
                style={{ display: "none" }}
              />
              <label htmlFor="newAvatarURL">
                <Button variant="outlined" component="span" sx={{ mb: 4 }}>
                  Change Avatar
                </Button>
              </label>

              <TextField
                margin="normal"
                label="New Name"
                value={name}
                placeholder={name}
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                margin="normal"
                label="New Email"
                value={email}
                placeholder={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Box
                sx={{
                  mt: 4,
                  display: { xs: "block", sm: "flex" },
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdateSubmit}
                  sx={{ mr: 2, mb: { xs: 2, sm: 0 } }}>
                  Save Changes
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDeleteOpen}
                  sx={{ mr: 2, mb: { xs: 2, sm: 0 } }}>
                  Delete User
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  component={RouterLink}
                  to="/dashboard"
                  sx={{ mr: 2, mb: { xs: 2, sm: 0 } }}>
                  Go to Dashboard
                </Button>
                <DeleteUserModal
                  variant="outlined"
                  color="error"
                  onOpen={openDelete}
                  onClose={handleDeleteClose}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default UserProfilePage;

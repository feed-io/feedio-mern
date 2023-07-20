import React, { useEffect, useState, useContext } from "react";
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
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get(
          `https://feedio-server.vercel.app/api/users/${auth.userId}`,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );

        setUser(response.data.user);
        setEmail(response.data.user.email);
        setUsername(response.data.user.username);
      } catch (error) {
        console.log("Error fetching user data:", error.message);
      }
    };
    loadData();
  }, [auth.token, auth.userId]);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://feedio-server.vercel.app/api/users/${auth.userId}`,
        {
          email: email,
          username: username,
        },
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
                alt={username}
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
                label="Username"
                value={username}
                placeholder={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <TextField
                margin="normal"
                label="Email"
                value={email}
                placeholder={email}
                onChange={(e) => setEmail(e.target.value)}
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

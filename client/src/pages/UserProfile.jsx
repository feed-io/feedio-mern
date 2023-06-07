import React, { useEffect, useState, useContext } from "react";
import {
  Typography,
  Box,
  Button as MuiButton,
  Container,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";

import { AuthContext } from "../context/auth-context";
import UpdateModal from "../components/dashboardPage/UpdateModal";
import DeleteModal from "../components/dashboardPage/DeleteModal";

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "50px",
});

const StyledButton = styled(MuiButton)(({ theme }) => ({
  margin: theme.spacing(1),
}));

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
    <Container>
      <StyledBox>
        <Avatar
          alt={username}
          src={user.image}
          sx={{ width: 120, height: 120 }}
        />
        <Typography variant="h5" component="div" sx={{ mt: 2 }}>
          {username}
        </Typography>
        <Typography variant="subtitle1" component="div">
          {email}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <StyledButton variant="outlined" onClick={handleEditOpen}>
            Edit Profile
          </StyledButton>
          <StyledButton
            variant="outlined"
            onClick={handleDeleteOpen}
            color="error">
            Delete Account
          </StyledButton>
        </Box>
      </StyledBox>
      <UpdateModal onOpen={openEdit} onClose={handleEditClose} />
      <DeleteModal onOpen={openDelete} onClose={handleDeleteClose} />
    </Container>
  );
}

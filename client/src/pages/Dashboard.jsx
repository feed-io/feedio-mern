import React, { useEffect, useState, useContext } from "react";
import { Typography, Box, Button, Fab, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

import { AuthContext } from "../context/auth-context";
import ProductList from "../components/dashboardPage/ProductList";
import UpdateModal from "../components/dashboardPage/UpdateModal";
import CreateModal from "../components/dashboardPage/CreateModal";
import DeleteModal from "../components/dashboardPage/DeleteModal";
import Avatar from "../components/dashboardPage/Avatar";

export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [prodQuantity, setProdQuantity] = useState(0);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openCreateProduct, setOpenCreateProduct] = useState(false);
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

        setUser(response.data.user);
        setEmail(response.data.user.email);
        setUsername(response.data.user.username);
        setProdQuantity(response.data.user.products.length);
      } catch (error) {
        console.log("Error fetching testimonials data:", error.message);
      }
    };
    loadData();
  }, []);

  const handleCreateProduct = () => {
    handleCreateProductOpen();
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
  const handleCreateProductOpen = () => {
    setOpenCreateProduct(true);
  };

  const handleCreateProductClose = () => {
    setOpenCreateProduct(false);
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "80%",
            mb: 3,
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
            <Typography variant="h4" component="h1">
              {username}
            </Typography>
          </Box>
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
        </Box>
        <Typography variant="h6" component="h3" textAlign="center">
          Spaces
        </Typography>
        <ProductList />
        <Fab
          color="primary"
          sx={{
            position: "fixed",
            bottom: 4,
            right: 4,
          }}
          onClick={handleCreateProduct}>
          <AddIcon />
        </Fab>
      </Box>
      {/* Create product dialog */}
      <CreateModal
        onOpen={openCreateProduct}
        onClose={handleCreateProductClose}
      />
      {/* Update user dialog */}
      <UpdateModal onOpen={openUpdate} onClose={handleUpdateClose} />
      {/* Delete user dialog */}
      <DeleteModal onOpen={openDelete} onClose={handleDeleteClose} />
    </Container>
  );
}

import React, { useEffect, useState, useContext } from "react";
import { Typography, Box, Button, Fab, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

import { AuthContext } from "../context/auth-context";
import ProductList from "../components/dashboardPage/ProductList";
import UpdateModal from "../components/dashboardPage/UpdateModal";
import CreateModal from "../components/dashboardPage/CreateModal";
import DeleteModal from "../components/dashboardPage/DeleteModal";

export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const auth = useContext(AuthContext);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openCreateProduct, setOpenCreateProduct] = useState(false);

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

        setEmail(response.data.user.email);
        setUsername(response.data.user.username);
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
          Products
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

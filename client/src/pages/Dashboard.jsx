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
import ProductsList from "../components/dashboard/ProductsList";

export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const auth = useContext(AuthContext);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [openCreateProduct, setOpenCreateProduct] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductImageUrl, setNewProductImageUrl] = useState("");

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

      handleUpdateClose();
    } catch (error) {
      console.log("Error deleting user:", error.message);
    }
  };

  const handleCreateProductSubmit = async (e) => {
    e.preventDefault();
    console.log(auth);
    try {
      const response = await axios.post(
        `http://localhost:8080/api/users/${auth.userId}/products/createProduct`,
        {
          name: newProductName,
          imageUrl: newProductImageUrl,
        },
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );
      console.log(response);
      handleCreateProductClose();
      // Add the new product to the list of products or reload the list of products
    } catch (error) {
      console.log("Error creating product:", error.message);
    }
  };

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
        <ProductsList />
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
      <Dialog open={openCreateProduct} onClose={handleCreateProductClose}>
        <DialogTitle>Create New Product</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Product Name"
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Image URL"
            value={newProductImageUrl}
            onChange={(e) => setNewProductImageUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateProductClose}>Cancel</Button>
          <Button color="primary" onClick={handleCreateProductSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

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

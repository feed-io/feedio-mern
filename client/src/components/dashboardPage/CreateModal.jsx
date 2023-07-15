import React, { useState, useContext } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";

import { AuthContext } from "../../context/auth-context";

const CreateModal = (props) => {
  const [newProductName, setNewProductName] = useState("");
  const [newProductImageUrl, setNewProductImageUrl] = useState("");
  const [newProductHeader, setNewProductHeader] = useState("");
  const [newProductContent, setNewProductContent] = useState("");
  const [newProductQuestions, setNewProductQuestions] = useState([]);
  const [newProductRating, setNewProductRating] = useState(0);

  const { onOpen, onClose, onProductCreated } = props;
  const auth = useContext(AuthContext);

  const handleCreateProductSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `http://localhost:8080/api/users/${auth.userId}/products/createProduct`,
        {
          name: newProductName,
          imageUrl: newProductImageUrl,
          header: newProductHeader,
          content: newProductContent,
          questions: newProductQuestions,
          rating: newProductRating,
        },
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );

      onClose();
      onProductCreated();
    } catch (error) {
      console.log("Error creating product:", error.message);
    }
  };

  return (
    <Dialog open={onOpen} onClose={onClose}>
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
        <TextField
          fullWidth
          margin="normal"
          label="Header"
          value={newProductHeader}
          onChange={(e) => setNewProductHeader(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Content"
          value={newProductContent}
          onChange={(e) => setNewProductContent(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Questions (comma-separated)"
          onChange={(e) => setNewProductQuestions(e.target.value.split(","))}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleCreateProductSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateModal;

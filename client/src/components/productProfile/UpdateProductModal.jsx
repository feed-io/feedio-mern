import React, { useState, useContext, useEffect } from "react";
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

const UpdateProductModal = (props) => {
  const { product, open, onClose, onProductUpdate } = props;
  const auth = useContext(AuthContext);
  const [updatedProductName, setUpdatedProductName] = useState();
  const [updatedProductImageUrl, setUpdatedProductImageUrl] = useState();
  const [updatedProductHeader, setUpdatedProductHeader] = useState();
  const [updatedProductContent, setUpdatedProductContent] = useState();
  const [updatedProductQuestions, setUpdatedProductQuestions] = useState();

  const handleUpdateProductSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:8080/api/users/${auth.userId}/products/${props.productId}`,
        {
          name: updatedProductName,
          imageUrl: updatedProductImageUrl,
          header: updatedProductHeader,
          content: updatedProductContent,
          questions: updatedProductQuestions,
        },
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );

      onClose();
      onProductUpdate();
    } catch (error) {
      console.log("Error updating product:", error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Product</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Product Name"
          value={updatedProductName}
          onChange={(e) => setUpdatedProductName(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Image URL"
          value={updatedProductImageUrl}
          onChange={(e) => setUpdatedProductImageUrl(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Header"
          value={updatedProductHeader}
          onChange={(e) => setUpdatedProductHeader(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Content"
          value={updatedProductContent}
          onChange={(e) => setUpdatedProductContent(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Questions (comma-separated)"
          onChange={(e) =>
            setUpdatedProductQuestions(e.target.value.split(","))
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleUpdateProductSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateProductModal;

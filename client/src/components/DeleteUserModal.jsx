import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
} from "@mui/material";

import { AuthContext } from "../context/auth-context";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const DeleteUserModal = (props) => {
  const { onOpen, onClose } = props;
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.delete(`${SERVER_URL}/api/users/${auth.userId}`, {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      });

      onClose();
      auth.logout();
      navigate("/");
    } catch (error) {
      console.log("Error deleting user:", error.message);
    }
  };

  return (
    <Dialog open={onOpen} onClose={onClose}>
      <DialogTitle sx={{ fontWeight: "bold" }}>Delete Account</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete your account?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ mt: 2, pr: 2, pb: 2 }}>
        <Button variant="warning" onClick={onClose}>
          Cancel
        </Button>
        <Box sx={{ ml: 2 }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteSubmit}>
            Delete
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserModal;

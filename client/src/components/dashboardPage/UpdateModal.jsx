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
const UpdateModal = (props) => {
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [email, setEmail] = useState("");
  const { onOpen, onClose } = props;
  const auth = useContext(AuthContext);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
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

      onClose();
    } catch (error) {
      console.log("Error updating user:", error.message);
    }
  };

  return (
    <Dialog open={onOpen} onClose={onClose}>
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
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleUpdateSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateModal;

import React, { useContext } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import axios from "axios";
import { AuthContext } from "../../context/auth-context";
const UpdateModal = (props) => {
  const { onOpen, onClose } = props;

  const auth = useContext(AuthContext);

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.delete(`http://localhost:8080/api/users/${auth.userId}`, {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      });

      onClose();
    } catch (error) {
      console.log("Error deleting user:", error.message);
    }
  };

  return (
    <Dialog open={onOpen} onClose={onClose}>
      <DialogTitle>Delete Account</DialogTitle>
      <DialogContent>
        {/* Add any email related to deleting the account here */}
        Are you sure you want to delete your account?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleDeleteSubmit}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateModal;

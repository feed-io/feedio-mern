import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import SignUp from "./auth/signup";
import Login from "./auth/login";

const AuthModal = ({ open, handleClose }) => {
  const [hasAccount, setHasAccount] = useState(true);

  const handleCreateAccount = () => {
    setHasAccount(false);
  };

  const handleHaveAccount = () => {
    setHasAccount(true);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle></DialogTitle>
      <DialogContent>{hasAccount ? <Login /> : <SignUp />}</DialogContent>
      <DialogActions>
        {hasAccount ? (
          <Button onClick={handleCreateAccount}>Need an account?</Button>
        ) : (
          <Button onClick={handleHaveAccount}>Already have an account?</Button>
        )}
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AuthModal;

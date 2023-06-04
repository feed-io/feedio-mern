import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import SignUp from "./signup";
import Login from "./login";

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
      <DialogContent>
        {hasAccount ? (
          <Login handleClose={handleClose} />
        ) : (
          <SignUp handleClose={handleClose} />
        )}
      </DialogContent>
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

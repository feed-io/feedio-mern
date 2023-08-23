import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import SignUp from "./Signup";
import Login from "./Login";
import Logo from "../assets/logo.svg";
import { Box, useTheme } from "@mui/material";

const AuthModal = ({ open, handleClose }) => {
  const [hasAccount, setHasAccount] = useState(true);
  const theme = useTheme();
  const handleCreateAccount = () => {
    setHasAccount(false);
  };

  const handleHaveAccount = () => {
    setHasAccount(true);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.palette.success.main,
          paddingTop: "16px",
          paddingBottom: "16px",
        }}>
        <img
          src={Logo}
          alt="Sentiment"
          style={{ width: "100px", height: "100px" }}
        />
      </Box>
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

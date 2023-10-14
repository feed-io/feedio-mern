import React from "react";
import { Modal, Typography, Button, Box, Fade } from "@mui/material";

const modalStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const paperStyle = {
  backgroundColor: "#fff",
  border: "2px solid #000",
  borderRadius: "8px", // Set border radius to 8px
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  padding: "24px",
  maxWidth: "400px",
  textAlign: "center",
};

const buttonStyle = {
  marginTop: "16px",
};

const MaintenanceModal = ({ isOpen, message, onClose }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      style={modalStyle}
      closeAfterTransition>
      <Fade in={isOpen}>
        <div style={paperStyle}>
          <Typography variant="h5" gutterBottom>
            Maintenance Alert
          </Typography>
          <Typography variant="body1" gutterBottom>
            {message}
          </Typography>
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={onClose}
              style={buttonStyle}>
              Close
            </Button>
          </Box>
        </div>
      </Fade>
    </Modal>
  );
};

export default MaintenanceModal;

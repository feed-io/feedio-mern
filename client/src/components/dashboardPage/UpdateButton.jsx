import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import axios from "axios";

import { AuthContext } from "../../context/auth-context";

const Update = (props) => {
  console.log(props);
  const auth = useContext(AuthContext);
  const [openUpdate, setOpenUpdate] = useState(false);

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
      } catch (error) {
        console.log("Error fetching testimonials data:", error.message);
      }
    };
    loadCompanyData();
  }, []);

  const handleUpdateClick = () => {
    setOpenUpdate(true);
  };

  const handleUpdateClose = () => {
    setOpenUpdate(false);
  };
  return (
    <Container maxWidth="sm">
      {/* Update user dialog */}
      <Dialog open={openUpdate} onClose={handleUpdateClose}>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>{/* Add the update user form here */}</DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>Cancel</Button>
          <Button color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Update();

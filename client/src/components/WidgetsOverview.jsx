import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { AuthContext } from "../context/auth-context";
import LogoSpinner from "../components/spinner/LogoSpinner";

const WidgetsOverview = ({ product }) => {
  const [widgets, setWidgets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedWidget, setSelectedWidget] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const auth = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    const fetchWidgets = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/users/${auth.userId}/products/${product._id}/widgets/`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setWidgets(response.data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
      setLoading(false);
    };

    fetchWidgets();
  }, [auth.token, auth.userId, product._id]);

  const handleDeleteClick = (widget) => {
    setSelectedWidget(widget);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedWidget(null);
  };

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  const deleteWidget = async (widgetId) => {
    try {
      await axios.delete(
        `${SERVER_URL}/api/users/${auth.userId}/products/${product._id}/widgets/${widgetId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      // Remove the widget from the state to update the UI
      setWidgets(widgets.filter((widget) => widget._id !== widgetId));
    } catch (error) {
      console.error("Error deleting widget:", error);
      // Handle error
    }
  };

  const handleConfirmDelete = () => {
    if (selectedWidget) {
      deleteWidget(selectedWidget._id);
      setDeleteModalOpen(false);
      setSelectedWidget(null);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh">
        <LogoSpinner />
      </Box>
    );
  }

  if (widgets.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh">
        <Typography variant="h5">No active widgets to display</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={3}>
        {widgets.map((widget) => (
          <Grid item xs={12} sm={6} md={4} key={widget._id}>
            <Card sx={{ borderRadius: 4 }} raised>
              <CardContent>
                <Typography variant="h6" component="h2">
                  {widget.name}
                </Typography>
                <Typography color="textSecondary">
                  Type: {widget.type}
                </Typography>
                <Typography color="textSecondary">
                  Created: {new Date(widget.createdAt).toLocaleDateString()}
                </Typography>
                <Typography color="textSecondary">
                  Location: {widget.location}
                </Typography>
                <Chip
                  label={`Background: ${widget.backgroundColor}`}
                  variant="outlined"
                  size="small"
                  style={{ marginRight: "5px" }}
                />
                <Chip
                  label={`Text: ${widget.textColor}`}
                  variant="outlined"
                  size="small"
                />
                <Box mt={2} display="flex" justifyContent="center" gap={2}>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteClick(widget)}>
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedWidget && (
        <Dialog open={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this widget?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteModal}>Cancel</Button>
            <Button onClick={handleConfirmDelete} color="error">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default WidgetsOverview;

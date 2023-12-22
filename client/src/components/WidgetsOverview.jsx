import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Box,
  Chip,
} from "@mui/material";
import { AuthContext } from "../context/auth-context";

const WidgetsOverview = ({ product }) => {
  const [widgets, setWidgets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Active Widgets
      </Typography>
      <Grid container spacing={3}>
        {widgets.map((widget) => (
          <Grid item xs={12} sm={6} md={4} key={widget._id}>
            <Card raised>
              <CardContent>
                <Typography variant="h6" component="h2">
                  {widget.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Type: {widget.type}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Created: {new Date(widget.createdAt).toLocaleDateString()}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Location: {widget.location || "Not specified"}
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
                  <Button variant="contained" color="primary" size="small">
                    Edit
                  </Button>
                  <Button variant="contained" color="error" size="small">
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WidgetsOverview;

import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Typography,
  Snackbar,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material/";
import axios from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

import { AuthContext } from "../context/auth-context";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const CollectionFeedbackModal = (props) => {
  const auth = useContext(AuthContext);
  const [iframeSrc, setIframeSrc] = useState(null);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [embedLocation, setEmbedLocation] = useState("");

  const generateIframeLink = (widgetId) => {
    const baseIframeUrl = `${SERVER_URL}/api/users/${auth.userId}/products/${props.productId}/widgets/${widgetId}/serve`;

    let params = [];

    params.push(`type=collect-feedback`);

    return `<iframe height="800px" id="${widgetId}" src="${baseIframeUrl}?${params.join(
      "&"
    )}" frameBorder="0" scrolling="no" width="100%"></iframe>`;
  };

  const sendWidgetConfigToBackend = async () => {
    const config = {
      type: "collect-feedback",
      location: embedLocation,
    };

    try {
      const response = await axios.post(
        `${SERVER_URL}/api/users/${auth.userId}/products/${props.productId}/widgets/config`,
        config,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          },
        }
      );
      console.log(response);
      const widgetId = response.data.widgetData._id;
      const generatedIframeLink = generateIframeLink(widgetId);
      setIframeSrc(generatedIframeLink);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      if (error.response) {
        console.error("Response Data:", error.response.data);
        console.error("Response Status:", error.response.status);
        console.error("Response Headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request:", error.request);
      } else {
        console.error("Error", error.message);
      }
      throw error;
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(iframeSrc);
    setSnackbarOpen(true);
  };

  const handleEmbedLocationChange = (event) => {
    setEmbedLocation(event.target.value);
  };

  return (
    <Dialog
      open={true}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          p: 6,
          borderRadius: "lg",
        },
      }}>
      <Box position="absolute" right={1} top={1}>
        <IconButton onClick={props.closeModal}>
          <Close />
        </IconButton>
      </Box>
      <Typography variant="h4">
        <Box
          component="span"
          px={1}
          py={0.5}
          borderRadius="full"
          fontWeight="medium">
          Step 2
        </Box>
        Customize your widget
      </Typography>
      <Box textAlign="center" py={3}>
        <Typography variant="h4" gutterBottom>
          Embed a widget
        </Typography>
        <Box mt={3}>
          {iframeSrc && (
            <div>
              <SyntaxHighlighter language="markup" style={solarizedlight}>
                {iframeSrc}
              </SyntaxHighlighter>
              <Button
                color="primary"
                variant="contained"
                onClick={handleCopyCode}
                style={{ marginTop: "10px" }}>
                Copy Code
              </Button>
            </div>
          )}
        </Box>
      </Box>
      <Box>
        <Box display="flex" alignItems="center" mt={2}>
          <Box my={2}>
            <TextField
              label="Embed Location"
              variant="outlined"
              fullWidth
              value={embedLocation}
              onChange={handleEmbedLocationChange}
              helperText="Enter the URL or location where you'll embed this widget"
            />
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={sendWidgetConfigToBackend}>
          Create
        </Button>
      </Box>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Code copied to clipboard!"
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={() => setSnackbarOpen(false)}>
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </Dialog>
  );
};

export default CollectionFeedbackModal;

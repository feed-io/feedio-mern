import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  IconButton,
  Tooltip,
  Typography,
  Select,
  MenuItem,
  TextField,
  Snackbar,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
import { AuthContext } from "../context/auth-context";

const Carousel = (props) => {
  const auth = useContext(AuthContext);
  const [hideDate, setHideDate] = useState(false);
  const [iframeSrc, setIframeSrc] = useState(null);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [autoScroll, setAutoScroll] = useState(false);

  const generateIframeLink = (widgetId) => {
    const baseIframeUrl = `http://localhost:8080/api/users/${auth.userId}/products/${props.productId}/widgets/${widgetId}/serve`;

    let params = [];

    if (hideDate) {
      params.push("hideDate=on");
    }

    if (autoScroll) {
      params.push("autoScroll=on");
    }

    params.push(`type=${props.layoutType}`);

    return `<iframe height="800px" id="${widgetId}" src="${baseIframeUrl}?${params.join(
      "&"
    )}" frameBorder="0" scrolling="no" width="100%"></iframe>`;
  };

  const sendWidgetConfigToBackend = async () => {
    const config = {
      hideDate,
      type: props.layoutType,
      autoScroll,
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/api/users/${auth.userId}/products/${props.productId}/widgets/config`,
        config,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          },
        }
      );

      const widgetId = response.data.widget._id;
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
        <IconButton onClick={props.goBack}>
          <ArrowBackIcon />
        </IconButton>
        <IconButton onClick={props.closeModal}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box textAlign="center" py={3}>
        <Typography variant="h4" gutterBottom>
          Embed a Show Room
        </Typography>
        <Typography variant="body1">
          <Box
            component="span"
            px={1}
            py={0.5}
            borderRadius="full"
            fontWeight="medium">
            Step 2
          </Box>
          Customize your Show Room
        </Typography>

        <Box display="flex" justifyContent="center" alignItems="center" my={2}>
          {/* <CheckCircleIcon /> */}
          <Typography variant="body2" color="main" ml={1}>
            Carousel
          </Typography>
        </Box>

        <Box mt={3}>
          {iframeSrc && (
            <div>
              <TextField
                variant="outlined"
                fullWidth
                value={iframeSrc}
                readOnly
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography variant="caption">Embed Link:</Typography>
                    </InputAdornment>
                  ),
                }}
              />
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

        <Typography variant="caption" color="main" display="block">
          Height is set to 800px by default. You can change the height parameter
          to what you like.
        </Typography>
        <Box display="flex" alignItems="center" mt={2}>
          <Checkbox color="secondary" disabled />
          <Typography variant="body2">Remove Feedio branding</Typography>
          <Tooltip
            title="Please upgrade to our subscription plan to unlock this feature."
            arrow>
            <LockIcon color="warning" ml={1} />
          </Tooltip>
        </Box>
        <Box display="flex" alignItems="center" mt={2}>
          <Checkbox
            color="secondary"
            checked={hideDate}
            onChange={(e) => setHideDate(e.target.checked)}
          />
          <Typography variant="body2">Hide the date</Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={2}>
          <Checkbox
            color="secondary"
            checked={autoScroll}
            onChange={(e) => setAutoScroll(e.target.checked)}
          />
          <Typography variant="body2">Auto Scroll</Typography>
        </Box>
      </Box>
      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={sendWidgetConfigToBackend}>
          Create
        </Button>
      </Box>
      {/* Snackbar for copied notification */}
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
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Dialog>
  );
};

export default Carousel;

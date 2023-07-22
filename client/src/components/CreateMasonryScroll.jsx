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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
import { AuthContext } from "../context/auth-context";

const MasonryModal = (props) => {
  const auth = useContext(AuthContext);
  const [hideDate, setHideDate] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState("1");

  const generateIframeLink = () => {
    let srcLink = "http://localhost:8080/api/widget?";

    srcLink += hideDate ? "hideDate=true&" : "hideDate=false&";
    srcLink += `scrollSpeed=${scrollSpeed}`;

    const iframeCode = `<iframe height="800px" id="testimonialto-dasdsa-tag-all-light-animated" src="${srcLink}" frameborder="0" scrolling="no" width="100%"></iframe>`;
    alert(iframeCode);

    const config = {
      hideDate,
      scrollSpeed,
      productId: props.productId,
    };
    console.log(config);
    sendWidgetConfigToBackend(config);
  };

  const sendWidgetConfigToBackend = async (config, token) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/widget/config",
        config,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response Data:", error.response.data);
        console.error("Response Status:", error.response.status);
        console.error("Response Headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error", error.message);
      }
      throw error;
    }
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
            Masonry - scrolling
          </Typography>
        </Box>
        <Box p={2} my={2}>
          <Typography variant="body2" color="main">
            &lt;iframe ... &gt;&lt;/iframe&gt;
          </Typography>
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
          <Typography variant="body2">Scroll speed:</Typography>
          <Select
            value={scrollSpeed}
            onChange={(e) => setScrollSpeed(e.target.value)}
            variant="outlined"
            size="small"
            ml={1}>
            <MenuItem value="1">1x</MenuItem>
            <MenuItem value="2">2x</MenuItem>
          </Select>
        </Box>
      </Box>
      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={generateIframeLink}>
          Create
        </Button>
      </Box>
      <Box>{/* <Widget /> */}</Box>
    </Dialog>
  );
};

export default MasonryModal;

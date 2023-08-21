import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  Rating,
  Box,
  Typography,
} from "@mui/material";

import { AuthContext } from "../context/auth-context";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const SubmitFeedbackModal = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("");
  // const [open, setOpen] = useState(false);
  const { productId } = useParams();

  const auth = useContext(AuthContext);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleAnswerSubmit = async (event) => {
    event.preventDefault();

    const reviewData = {
      productId: productId,
      name: name,
      email: email,
      content: content,
      rating: rating,
    };

    try {
      await axios.post(
        `${SERVER_URL}/api/users/${auth.userId}/products/${productId}/reviews/createReview`,
        reviewData,
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );

      setName("");
      setEmail("");
      setContent("");
      setRating("");
    } catch (error) {
      console.log("Error submitting review:", error.message);
    }
  };

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Dialog
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="review-dialog">
          <DialogContent>
            <form onSubmit={handleAnswerSubmit}>
              <TextField
                label="Your Name"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={name}
                onChange={handleNameChange}
              />
              <TextField
                label="Your Email"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={email}
                onChange={handleEmailChange}
              />
              <TextField
                label="Your Review"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={content}
                onChange={handleContentChange}
              />
              <Box
                sx={{
                  mb: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}>
                <Typography variant="caption" gutterBottom>
                  Rating
                </Typography>
                <Rating
                  name="rating"
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                />
              </Box>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleAnswerSubmit}
              variant="contained"
              color="primary">
              Submit Review
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Container>
  );
};

export default SubmitFeedbackModal;

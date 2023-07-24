import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  Rating,
  TableContainer,
  TableRow,
  Chip,
  Typography,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Archive,
  Star,
  Delete,
  Favorite,
  MailOutline,
  CalendarToday,
} from "@mui/icons-material";

import Empty from "../assets/empty.svg";

const ReviewRows = ({ product, userId, token, onSpaceCreated }) => {
  const [reviews, setReviews] = useState([]);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${userId}/products/${product._id}/reviews/${product._id}/all`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        setReviews(response.data.reviews);
      } catch (error) {
        console.log("Error fetching reviews:", error.message);
      }
    };

    fetchReviews();
  }, [userId, token, product._id]);

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/users/${userId}/products/${product._id}/reviews/${reviewId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setReviews(reviews.filter((review) => review._id !== reviewId));
      if (onSpaceCreated) {
        onSpaceCreated();
      }
    } catch (error) {
      console.log("Error deleting review:", error.message);
    }
  };

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    return date.toLocaleString("en-US", options);
  };

  const categorizeSentiment = (score) => {
    if (score > 2) {
      return "Positive";
    } else if (score < 2) {
      return "Negative";
    }
    return "Neutral";
  };

  return (
    <TableContainer component={Box}>
      <Table aria-label="collapsible table">
        <TableBody>
          {reviews.length === 0 ? (
            <Box>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Box
                  display="flex"
                  width="15%"
                  alignItems="center"
                  justifyContent="center">
                  <img
                    src={Empty}
                    width="540"
                    alt="No Reviews"
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                paddingTop={4}
                justifyContent="center">
                <Typography variant="subtitle1">No reviews yet</Typography>
              </Box>
            </Box>
          ) : (
            reviews.map((review, index) => (
              <>
                <TableRow key={review._id}>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => handleToggle(review._id)}>
                      {openId === review._id ? (
                        <KeyboardArrowUp />
                      ) : (
                        <KeyboardArrowDown />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Typography>From:</Typography>
                    {review.name}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={categorizeSentiment(review.sentiment)}
                      variant="outlined"
                      color={
                        review.sentiment > 2
                          ? "success"
                          : review.sentiment < 2
                          ? "error"
                          : "default"
                      }
                      size="small"
                      style={{ marginRight: 10 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Rating
                      value={review.rating}
                      readOnly
                      icon={<Star fontSize="inherit" />}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton>
                      <Favorite />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton>
                      <Archive />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(review._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}>
                    <Collapse
                      in={openId === review._id}
                      timeout="auto"
                      unmountOnExit>
                      <Box sx={{ padding: 2 }}>
                        {/* Content */}
                        <Box sx={{ marginBottom: 2 }}>
                          <Typography variant="h6" gutterBottom>
                            Content:
                          </Typography>
                          <Typography variant="body2">
                            {review.content}
                          </Typography>
                        </Box>
                        {/* Sentiment */}
                        <Box sx={{ marginBottom: 2 }}>
                          <Typography variant="h6" gutterBottom>
                            Sentiment:
                          </Typography>
                          <Typography variant="body2">
                            {categorizeSentiment(review.sentiment)}
                          </Typography>
                        </Box>

                        {/* Email */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 1,
                          }}>
                          <Box size="small" color="main">
                            <MailOutline />
                          </Box>
                          <Typography variant="body2" sx={{ marginLeft: 1 }}>
                            {review.email}
                          </Typography>
                        </Box>

                        {/* Created At */}
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box size="small" color="main">
                            <CalendarToday />
                          </Box>
                          <Typography variant="body2" sx={{ marginLeft: 1 }}>
                            {formatDate(review.createdAt)}
                          </Typography>
                        </Box>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReviewRows;

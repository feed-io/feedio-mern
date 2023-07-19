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
  Typography,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Archive,
  Star,
  Delete,
  Favorite,
} from "@mui/icons-material";

const ReviewRows = ({ productId, userId, token }) => {
  const [reviews, setReviews] = useState([]);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${userId}/products/${productId}/reviews/${productId}/all`,
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
  }, [userId, token, productId]);

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/users/${userId}/products/${productId}/reviews/${reviewId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setReviews(reviews.filter((review) => review._id !== reviewId));
    } catch (error) {
      console.log("Error deleting review:", error.message);
    }
  };

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <TableContainer component={Box}>
      <Table aria-label="collapsible table">
        <TableBody>
          {reviews.length === 0 ? (
            <Typography variant="subtitle1">No reviews yet</Typography>
          ) : (
            reviews.map((review, index) => (
              <React.Fragment>
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
                  <TableCell>{review.name}</TableCell>
                  <TableCell>
                    <Rating
                      name="customized-color"
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
                      <Box sx={{ margin: 1 }}>
                        <Typography variant="body2">
                          {review.content}
                        </Typography>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReviewRows;

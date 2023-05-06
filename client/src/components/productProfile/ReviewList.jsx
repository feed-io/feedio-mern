import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const ReviewList = ({ productId, userId, token }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${userId}/products/${productId}/reviews`,
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
  }, [productId, userId, token]);

  return (
    <List>
      {reviews.length === 0 ? (
        <Typography variant="subtitle1">EMPTY</Typography>
      ) : (
        reviews.map((review) => (
          <ListItem key={review._id}>
            <ListItemText primary={review.title} secondary={review.content} />
          </ListItem>
        ))
      )}
    </List>
  );
};

export default ReviewList;

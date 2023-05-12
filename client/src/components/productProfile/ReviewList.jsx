import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const ReviewList = ({ productId, userId, token }) => {
  const [reviews, setReviews] = useState([]);
  console.log(productId);
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
        console.log(response);
        setReviews(response.data.reviews);
      } catch (error) {
        console.log("Error fetching reviews:", error.message);
      }
    };

    fetchReviews();
  }, [userId, token]);

  return (
    <List>
      {reviews.length === 0 ? (
        <Typography variant="subtitle1">No reviews yet</Typography>
      ) : (
        reviews.map((review) => (
          <ListItem key={review._id}>
            <ListItemText primary={review.name} secondary={review.content} />
          </ListItem>
        ))
      )}
    </List>
  );
};

export default ReviewList;
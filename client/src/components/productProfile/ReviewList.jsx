import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  List,
  Typography,
} from "@mui/material";
import axios from "axios";

const ReviewList = ({ productId, userId, token }) => {
  const [reviews, setReviews] = useState([]);

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
  }, [userId, token]);

  return (
    <List>
      {reviews.length === 0 ? (
        <Typography variant="subtitle1">No reviews yet</Typography>
      ) : (
        reviews.map((review) => (
          <Card key={review._id}>
            <CardMedia sx={{ height: 140 }} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {review.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {review.content}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        ))
      )}
    </List>
  );
};

export default ReviewList;

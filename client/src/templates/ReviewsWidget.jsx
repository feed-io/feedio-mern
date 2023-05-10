import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Typography, Box } from "@mui/material";

const ShowRoom = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/reviews");
        setReviews(response.data);
      } catch (error) {
        console.log("Error fetching reviews:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to the Show Room!
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Check out the latest reviews:
        </Typography>
        {reviews.map((review) => (
          <Card key={review._id} sx={{ my: 2, p: 2 }}>
            <Typography variant="h6" component="div">
              {review.author} - Rating: {review.rating}/5
            </Typography>
            <Typography variant="body1" gutterBottom>
              {review.content}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Posted on: {new Date(review.date).toLocaleString()}
            </Typography>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default ShowRoom;

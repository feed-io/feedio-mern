import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Avatar,
  Container,
  Grid,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
});

const StyledCard = styled(Card)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

const StyledCardMedia = styled(CardMedia)({
  height: 140,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
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
  }, [userId, token, productId]);

  return (
    <Container>
      <Grid container spacing={2}>
        {reviews.length === 0 ? (
          <Typography variant="subtitle1">No reviews yet</Typography>
        ) : (
          reviews.map((review) => (
            <Grid item xs={12} sm={6} md={4} key={review._id}>
              <StyledCard>
                <StyledCardMedia>
                  <Avatar
                    alt={review.name}
                    src={review.avatar}
                    sx={{ width: 80, height: 80 }}
                  />
                </StyledCardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {review.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {review.content}
                  </Typography>
                </CardContent>
                <CardActions>
                  <StyledRating
                    name="customized-color"
                    value={review.rating}
                    readOnly
                    icon={<FavoriteIcon fontSize="inherit" />}
                  />
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </StyledCard>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default ReviewList;

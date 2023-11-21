import React, { useState, useEffect, useContext } from "react";
import { Avatar, Box, Rating, Typography, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../context/auth-context";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const { productId } = useParams();
  const auth = useContext(AuthContext);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/users/${auth.userId}/products/${productId}/reviews/${productId}/all?status=fav`,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );

        setReviews(response.data.reviews);
      } catch (error) {
        console.log("Error fetching reviews:", error.message);
      }
    };

    fetchData();
  }, [productId, auth.userId, auth.token]);

  console.log(reviews);
  return (
    <Box className="flex-grow">
      <Box
        className="relative"
        maxWidth="6xl"
        mx="auto"
        height="0"
        pointerEvents="none"
        aria-hidden={true}
      />

      <Box position="relative">
        <Box position="absolute" top="0" left="0" right="0" bottom="0">
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            opacity="0.75"
            bgcolor={theme.palette.success.main}
            aria-hidden={true}
          />
        </Box>

        <Box maxWidth="6xl" mx="auto" px={{ xs: 4, sm: 6 }} position="relative">
          <Box pt={{ xs: 32, md: 20 }} pb={{ xs: 12, md: 20 }}>
            <Typography variant="h1" align="center" color="white" mb={4}>
              Feedio
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box position="relative">
        <Box maxWidth="6xl" mx="auto" px={{ xs: 4, sm: 6 }}>
          <Box py={{ xs: 8, lg: 6 }}>
            <Box maxWidth="3xl" mx="auto">
              {reviews.length > 0 ? (
                <Box
                  display="flex"
                  flexWrap="wrap"
                  justifyContent="center"
                  p={4}
                  borderRadius={1}>
                  {reviews.map((review, index) => (
                    <Box
                      key={index}
                      flex="1"
                      m={2}
                      p={3}
                      borderRadius={1}
                      boxShadow={1}
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between">
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mb={2}>
                        <Avatar />
                        <Typography variant="subtitle1" mt={2}>
                          {review.name}
                        </Typography>
                        <Typography variant="body2" mt={2} textAlign="center">
                          {review.content}
                        </Typography>
                      </Box>
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center">
                        <Rating
                          name="read-only"
                          value={review.rating}
                          readOnly
                        />
                        <Typography variant="caption" mt={2}>
                          {new Date(review.createdAt).toLocaleString(
                            "default",
                            { year: "numeric", month: "long" }
                          )}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box overflow="hidden" mx="auto">
                  <Typography
                    variant="h3"
                    align="center"
                    color="gray.600"
                    mt={5}>
                    No testimonials found
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ReviewsPage;

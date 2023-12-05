import axios from "axios";
import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Container,
  Button,
  TextField,
  Rating,
  Typography,
  useTheme,
  Paper,
  Slider,
} from "@mui/material";

import { AuthContext } from "../context/auth-context";

import Logo from "../assets/logo.svg";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const FeedbackTemplate = () => {
  const [productName, setProductName] = useState(null);
  const [productHeader, setProductHeader] = useState(null);
  const [productQuestions, setProductQuestions] = useState([]);
  const { productId } = useParams();
  const auth = useContext(AuthContext);
  const theme = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("");
  const [npsScore, setNpsScore] = useState(0);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleAnswerSubmit = async (event) => {
    event.preventDefault();

    const reviewData = {
      productId: productId,
      name: name,
      email: email,
      content: content,
      rating: rating,
      npsScore: npsScore,
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
      setNpsScore(0);
    } catch (error) {
      console.log("Error submitting data:", error.message);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/users/${auth.userId}/products/${productId}`,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );
        setProductName(response.data.product.name);
        setProductHeader(response.data.product.header);
        setProductQuestions(response.data.product.questions);
      } catch (error) {
        console.log("Error fetching product:", error.message);
      }
    };

    fetchProduct();
  }, [productId, auth.userId, auth.token]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgcolor={theme.palette.success.main}>
      <Box flexGrow={1}>
        <Container>
          <Box pt={20} pb={12} textAlign="center">
            <Box display="flex" justifyContent="center" mb={6}>
              <img
                src={Logo}
                alt="Product Logo"
                style={{ maxHeight: "100px" }}
              />
            </Box>

            <Typography variant="h4" gutterBottom>
              {productName}
            </Typography>
            <Typography variant="body1">
              <Box>{productHeader}</Box>
            </Typography>

            <Paper
              elevation={3}
              sx={{
                mt: 4,
                py: 4,
                px: 2,
                borderRadius: 4,
                bgcolor: "background.paper",
                mx: "auto",
                maxWidth: "75%",
              }}>
              <Box textAlign="left" mx="auto" width={{ xs: "100%", md: "75%" }}>
                <Box pl={4}>
                  <ul>
                    {productQuestions.map((question, index) => (
                      <li key={index}>{question}</li>
                    ))}
                  </ul>
                </Box>
              </Box>

              <Box
                mt={6}
                display="flex"
                justifyContent="center"
                flexDirection="column"
                gap={2}>
                <form onSubmit={handleAnswerSubmit}>
                  <TextField
                    label="Your Name"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2, width: "75%" }}
                    value={name}
                    onChange={handleNameChange}
                  />
                  <TextField
                    label="Your Email"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2, width: "75%" }}
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <TextField
                    label="Your Review"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2, width: "75%" }}
                    value={content}
                    onChange={handleContentChange}
                  />
                  <Box
                    sx={{
                      mb: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}>
                    <Typography variant="subtitle1" gutterBottom>
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
                  <Box
                    sx={{
                      mt: 4,
                      mb: 6,
                      p: 2,
                    }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ textAlign: "center" }}>
                      On a scale of 0-10, how likely are you to recommend our
                      product/service to a friend or colleague?
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mt: 2,
                      }}>
                      <Typography variant="caption" sx={{ mb: 1 }}>
                        Your Score: {npsScore}
                      </Typography>
                      <Slider
                        name="nps-score"
                        value={npsScore}
                        onChange={(event, newValue) => {
                          setNpsScore(newValue);
                        }}
                        aria-labelledby="nps-slider"
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={0}
                        max={10}
                        sx={{ width: "250px" }}
                      />
                    </Box>
                  </Box>

                  <Button type="submit" variant="contained" color="primary">
                    Submit Review
                  </Button>
                </form>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default FeedbackTemplate;

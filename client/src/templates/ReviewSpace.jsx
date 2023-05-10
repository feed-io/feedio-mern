import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  Button,
  Divider,
  Box,
  TextField,
} from "@mui/material";

import { AuthContext } from "../context/auth-context";

const ProductProfile = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [answer, setAnswer] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${auth.userId}/products/645bce30d8a08978e81a710a`,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );

        console.log(response);

        setProduct(response.data.product);
      } catch (error) {
        console.log("Error fetching product:", error.message);
      }
    };

    fetchProduct();
  }, [productId, auth.userId, auth.token]);

  const handleInputChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleAnswerSubmit = async (event) => {
    event.preventDefault();
    // Submit the answer...
    console.log(answer);
    setAnswer(""); // Clear the answer field after submission.
  };

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  // existing code...

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" textAlign="center">
            {product.name}
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="p" textAlign="center">
                {product.header}
              </Typography>
              <Typography variant="body1" component="p" textAlign="center">
                {product.content}
              </Typography>
              <Typography variant="h6" component="p">
                Questions:
              </Typography>
              <ul>
                {product.questions.map((question, index) => (
                  <li key={index}>{question}</li>
                ))}
              </ul>
              <form onSubmit={handleAnswerSubmit}>
                <TextField
                  label="Your Answer"
                  multiline
                  rows={4}
                  value={answer}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "1em" }}>
                  Submit Answer
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductProfile;

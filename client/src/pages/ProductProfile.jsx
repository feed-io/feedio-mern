import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Container, Card, CardContent, Grid } from "@mui/material";

import { AuthContext } from "../context/auth-context";
import ReviewList from "../components/productProfile/ReviewList";

const ProductProfile = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${auth.userId}/products/${productId}`,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );

        setProduct(response.data.product);
      } catch (error) {
        console.log("Error fetching product:", error.message);
      }
    };

    fetchProduct();
  }, [productId, auth.userId, auth.token]);

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="h1">
                {product.name}
              </Typography>
              <Typography variant="subtitle1" component="p">
                Header: {product.header}
              </Typography>
              <Typography variant="subtitle1" component="p">
                Content: {product.content}
              </Typography>
              <Typography variant="subtitle1" component="p">
                Rating: {product.rating}
              </Typography>
              <Typography variant="subtitle1" component="p">
                Image URL: {product.imageUrl}
              </Typography>
              <Typography variant="subtitle1" component="p">
                Questions:
              </Typography>
              <ul>
                {product.questions.map((question, index) => (
                  <li key={index}>{question}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ReviewList
            productId={productId}
            userId={auth.userId}
            token={auth.token}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductProfile;

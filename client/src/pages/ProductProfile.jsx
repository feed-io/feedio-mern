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
} from "@mui/material";

import { AuthContext } from "../context/auth-context";
import ReviewList from "../components/productProfile/ReviewList";

const ProductProfile = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

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

  const updateProduct = async (userId, productId, token, updatedProduct) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/users/${userId}/products/${productId}`,
        updatedProduct,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error updating product:", error.message);
    }
  };

  const deleteProduct = async (userId, productId, token) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/users/${userId}/products/${productId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log("Error deleting product:", error.message);
    }
  };

  const handleUpdate = async () => {
    const updatedProduct = {
      // Add the updated product data here
    };

    await updateProduct(auth.userId, productId, auth.token, updatedProduct);
    // Re-fetch the product data after updating
    // You can also update the state directly, but re-fetching ensures that the data is in sync with the server
  };

  const handleDelete = async () => {
    await deleteProduct(auth.userId, productId, auth.token);
    // Redirect to a different page after deleting the product, for example, the user's dashboard
    navigate("/dashboard");
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" textAlign="center">
            {product.name}
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Card>
              <CardContent>
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdate}>
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleDelete}>
                  Delete
                </Button>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}>
                    <ReviewList
                      productId={productId}
                      userId={auth.userId}
                      token={auth.token}
                    />
                  </Box>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductProfile;

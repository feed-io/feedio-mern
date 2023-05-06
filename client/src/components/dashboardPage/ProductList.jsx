import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Grid, Typography, Paper } from "@mui/material";

import { AuthContext } from "../../context/auth-context";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${auth.userId}/products/all`,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );

        setProducts(response.data.products);
      } catch (error) {
        console.log("Error fetching products:", error.message);
      }
    };

    fetchProducts();
  }, []);

  if (products.length === 0) {
    return <Typography variant="h6">EMPTY</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product._id}>
          <Link
            to={`/products/${product._id}`}
            style={{ textDecoration: "none" }}>
            <Paper elevation={2}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 2,
                  gap: 1,
                }}>
                <Typography variant="h6" component="h2">
                  {product.name}
                </Typography>
                <Typography variant="h6" component="h2">
                  {product.imageUrl}
                </Typography>
              </Box>
            </Paper>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductsList;

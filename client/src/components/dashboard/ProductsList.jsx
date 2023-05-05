import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Box, Grid, Typography, Paper } from "@mui/material";

import { AuthContext } from "../../context/auth-context";
import { UserDataContext } from "../../context/userData-context";

const ProductsList = () => {
  const [products, setProducts] = useState();
  const auth = useContext(AuthContext);
  const userData = useContext(UserDataContext);

  console.log();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${auth.userId}/products/${userData.productId[0]}`,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );

        setProducts(response.data.product);
      } catch (error) {
        console.log("Error fetching products:", error.message);
      }
    };

    fetchProducts();
  }, []);

  console.log(products);
  return (
    products && (
      <Grid container spacing={2}>
        {Object.values(products).map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product}>
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
                  {product}
                </Typography>
                <Typography variant="h6" component="h2">
                  {product}
                </Typography>
                {/* Add any additional information you want to display here */}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default ProductsList;

import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Stack, Box, Typography } from "@mui/material";
import axios from "axios";

import { AuthContext } from "../context/auth-context";
import Feed from "../components/productProfile/Feed";
import Sidebar from "../components/productProfile/Sidebar";

export default function ProductProfile() {
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
    <Box>
      <Stack direction={"row"}>
        <Sidebar product={product} />
        <Feed product={product} />
      </Stack>
    </Box>
  );
}

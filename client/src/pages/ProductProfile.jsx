// import React, { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Typography,
//   Container,
//   Card,
//   CardContent,
//   Grid,
//   Button,
//   Divider,
//   Box,
// } from "@mui/material";

// import { AuthContext } from "../context/auth-context";
// import ReviewList from "../components/productProfile/ReviewList";

// const ProductProfile = () => {
//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);
//   const auth = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8080/api/users/${auth.userId}/products/${productId}`,
//           {
//             headers: {
//               Authorization: "Bearer " + auth.token,
//             },
//           }
//         );

//         setProduct(response.data.product);
//       } catch (error) {
//         console.log("Error fetching product:", error.message);
//       }
//     };

//     fetchProduct();
//   }, [productId, auth.userId, auth.token]);

//   if (!product) {
//     return <Typography>Loading...</Typography>;
//   }

//   const updateProduct = async (userId, productId, token, updatedProduct) => {
//     try {
//       const response = await axios.patch(
//         `http://localhost:8080/api/users/${userId}/products/${productId}`,
//         updatedProduct,
//         {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.log("Error updating product:", error.message);
//     }
//   };

//   const deleteProduct = async (userId, productId, token) => {
//     try {
//       const response = await axios.delete(
//         `http://localhost:8080/api/users/${userId}/products/${productId}`,
//         {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         }
//       );
//       console.log(response.data);
//     } catch (error) {
//       console.log("Error deleting product:", error.message);
//     }
//   };

//   const handleUpdate = async () => {
//     const updatedProduct = {
//       // Add the updated product data here
//     };

//     await updateProduct(auth.userId, productId, auth.token, updatedProduct);
//   };

//   const handleDelete = async () => {
//     await deleteProduct(auth.userId, productId, auth.token);
//     navigate("/dashboard");
//   };

//   return (
//     <Container maxWidth="lg">
//       <Grid container spacing={4}>
//         <Grid item xs={12}>
//           <Typography variant="h4" component="h1" textAlign="center">
//             {product.name}
//           </Typography>
//           <Divider />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}>
//             <Card sx={{ width: "1000px" }}>
//               <CardContent>
//                 <Typography variant="subtitle1" component="p">
//                   Header: {product.header}
//                 </Typography>
//                 <Typography variant="subtitle1" component="p">
//                   Content: {product.content}
//                 </Typography>
//                 <Typography variant="subtitle1" component="p">
//                   {/* Image URL: {product.imageUrl} */}
//                 </Typography>
//                 <Typography variant="subtitle1" component="p">
//                   Questions:
//                 </Typography>
//                 <ul>
//                   {product.questions.map((question, index) => (
//                     <li key={index}>{question}</li>
//                   ))}
//                 </ul>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={handleUpdate}>
//                   Update
//                 </Button>
//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   onClick={handleDelete}>
//                   Delete
//                 </Button>
//                 <Grid item xs={12} sm={6}>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "center",
//                     }}>
//                     <ReviewList
//                       productId={productId}
//                       userId={auth.userId}
//                       token={auth.token}
//                     />
//                   </Box>
//                 </Grid>
//               </CardContent>
//             </Card>
//           </Box>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default ProductProfile;

import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Card, CardContent, Grid, Button } from "@mui/material";

import { AuthContext } from "../context/auth-context";
import ReviewList from "../components/productProfile/ReviewList";

const drawerWidth = 240;

export default function ProductProfile() {
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
    const updatedProduct = {};

    await updateProduct(auth.userId, productId, auth.token, updatedProduct);
  };

  const handleDelete = async () => {
    await deleteProduct(auth.userId, productId, auth.token);
    navigate("/dashboard");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          },
        }}
        variant="permanent"
        anchor="left">
        {/* ... Add your Drawer components here ... */}
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
        <Toolbar />
        {product ? (
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
                  <Card sx={{ width: "100%" }}>
                    <CardContent>
                      <Typography variant="subtitle1" component="p">
                        Header: {product.header}
                      </Typography>
                      <Typography variant="subtitle1" component="p">
                        Content: {product.content}
                      </Typography>
                      <Typography variant="subtitle1" component="p">
                        {/* Image URL: {product.imageUrl} */}
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
            </Grid>
          </Container>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Box>
    </Box>
  );
}

import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  useMediaQuery,
  Button,
  IconButton,
  useTheme,
  Divider,
} from "@mui/material";
import { Person, VerifiedUser, Payment, Delete } from "@mui/icons-material";

import CreateRoomModal from "../components/CreateRoomModal";
import { AuthContext } from "../context/auth-context";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const RoomsPage = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const auth = useContext(AuthContext);
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/users/${auth.userId}/products/all`,

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
  }, [refreshTrigger, auth.token, auth.userId]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/users/${auth.userId}`,

          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );

        setUser(response.data.user.email);
      } catch (error) {
        console.log("Error fetching user:", error.message);
      }
    };

    fetchUser();
  }, [refreshTrigger, auth.token, auth.userId]);

  const handleDeleteProduct = async (event, productId) => {
    event.stopPropagation();

    try {
      await axios.delete(
        `${SERVER_URL}/api/users/${auth.userId}/products/${productId}`,

        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );

      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  const handleSpaceCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleManageBilling = async () => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/users/${auth.userId}/payments/create-customer-portal-session`,
        {},
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );

      if (response.data && response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container
        sx={{
          bgcolor: theme.palette.primary.contrastText,
          boxShadow: 1,

          borderRadius: 8,
          my: 8,
        }}
        maxWidth={"lg"}>
        <Box py={4}>
          {/* Overview Section */}
          <Box mb={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ py: 2, mt: 4, borderColor: "divider", borderBottom: 1 }}
              my={2}>
              <Typography
                variant={isMobile ? "h5" : "h4"}>{`Hi, ${user}`}</Typography>
            </Box>
            <Grid
              container
              mt={4}
              spacing={2}
              sx={{ justifyContent: "space-around" }}>
              {[
                { icon: <Person />, label: "Profile", path: "/profile/" },
                {
                  icon: <VerifiedUser />,
                  label: "Subscription",
                  path: "/membership/",
                },
                {
                  icon: <Payment />,
                  label: "Billing",
                  status: auth.membershipStatus,
                  path: "https://billing.stripe.com/p/login/test_dR617p7Gs2DvesMfYY",
                },
              ].map(({ icon, label, path }, index) => (
                <Grid item xs={6} sm={2} key={index}>
                  <Button
                    startIcon={icon}
                    href={label !== "Billing" ? path : undefined}
                    disabled={
                      label === "Billing" && auth.membershipStatus === "free"
                        ? true
                        : false
                    }
                    variant="primary"
                    fullWidth={isMobile}
                    sx={{
                      fontSize: { xs: "0.6rem", sm: "0.8rem" },
                      whiteSpace: { xs: "normal", sm: "nowrap" },
                      padding: "6px 12px",
                      textTransform: "none",
                    }}
                    onClick={
                      label === "Billing" ? handleManageBilling : undefined
                    }>
                    {label}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Rooms Section */}
          <Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={4}
              mb={2}>
              <Typography variant={isMobile ? "h5" : "h4"}>Rooms</Typography>
            </Box>

            <Box mb={4}>
              <Divider />
            </Box>

            <TableContainer
              component={Paper}
              sx={{
                overflowX: "auto",
                borderRadius: 4,
              }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow
                    sx={{
                      bgcolor: theme.palette.success.main,
                    }}>
                    <TableCell
                      sx={{ color: theme.palette.primary.contrastText }}>
                      Room
                    </TableCell>
                    <TableCell
                      sx={{ color: theme.palette.primary.contrastText }}
                      align="right">
                      Avg. Rating
                    </TableCell>
                    <TableCell
                      sx={{ color: theme.palette.primary.contrastText }}
                      align="right">
                      Number of Entries
                    </TableCell>
                    <TableCell
                      sx={{ color: theme.palette.primary.contrastText }}
                      align="right">
                      Delete
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product, index) => (
                    <TableRow
                      key={index}
                      hover
                      onClick={() => navigate(`/products/${product._id}`)}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        cursor: "pointer",
                      }}>
                      <TableCell component="th" scope="row">
                        {product.name}
                      </TableCell>
                      <TableCell align="right">
                        {product.averageRating.toFixed(1)}
                      </TableCell>
                      <TableCell align="right">
                        {product.reviews.length}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={(e) => handleDeleteProduct(e, product._id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box mb={2} mt={4}>
            <CreateRoomModal onSpaceCreated={handleSpaceCreated} />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default RoomsPage;

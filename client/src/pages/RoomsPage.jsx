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
  useMediaQuery,
  Button,
  IconButton,
  useTheme,
  Divider,
} from "@mui/material";
import { Person, VerifiedUser, Delete } from "@mui/icons-material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import WidgetsIcon from "@mui/icons-material/Widgets";
import ReviewsIcon from "@mui/icons-material/RateReview";
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
  const [totalAverage, setTotalAverage] = useState(0);
  const [activeWidgets, setActiveWidgets] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

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
        console.log(response.data.products);

        // Now calculate the total average, widgets and reviews based on the new products
        const totalRating = response.data.products.reduce(
          (acc, product) => acc + product.averageRating,
          0
        );
        const totalAverageRating = totalRating / response.data.products.length;

        const totalWidgets = response.data.products.reduce(
          (acc, product) => acc + product.widgets.length,
          0
        );

        const totalReviewsCount = response.data.products.reduce(
          (acc, product) => acc + product.reviews.length,
          0
        );

        setTotalAverage(totalAverageRating);
        setActiveWidgets(totalWidgets);
        setTotalReviews(totalReviewsCount);
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

        setUser(response.data.user.name);
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

  return (
    <>
      <Box py={4}>
        {/* Overview Section */}
        <Box mb={2} margin={(2, 4)}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ py: 2, mt: 4, borderColor: "divider", borderBottom: 1 }}
            my={2}>
            <Typography
              color={theme.palette.primary.contrastText}
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
            ].map(({ icon, label, path }, index) => (
              <Grid item xs={isMobile ? 12 : 6} sm={2} key={index}>
                <Button
                  startIcon={icon}
                  href={label !== "Billing" ? path : undefined}
                  disabled={
                    label === "Billing" && auth.membershipStatus === "free"
                      ? true
                      : false
                  }
                  variant="primary"
                  fullWidth
                  sx={{
                    fontSize: { xs: "0.7rem", sm: "0.8rem" },
                    whiteSpace: { xs: "normal", sm: "nowrap" },
                    padding: "6px 12px",
                    textTransform: "none",
                    marginBottom: isMobile ? 2 : 0,
                    color: theme.palette.primary.contrastText,
                  }}>
                  {label}
                </Button>
              </Grid>
            ))}
          </Grid>

          <Grid
            container
            mt={4}
            spacing={2}
            justifyContent="center"
            paddingTop={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Box
                color={theme.palette.info.main}
                display="flex"
                flexDirection="column"
                alignItems="center">
                <StarBorderIcon fontSize="large" />
                <Typography variant="h6">Total Average Rating</Typography>
                <Typography
                  color={theme.palette.primary.contrastText}
                  variant="subtitle1">
                  {totalAverage.toFixed(1)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box
                color={theme.palette.info.main}
                display="flex"
                flexDirection="column"
                alignItems="center">
                <WidgetsIcon fontSize="large" />
                <Typography variant="h6">Total Active Widgets</Typography>
                <Typography
                  color={theme.palette.primary.contrastText}
                  variant="subtitle1">
                  {activeWidgets}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box
                color={theme.palette.info.main}
                display="flex"
                flexDirection="column"
                alignItems="center">
                <ReviewsIcon fontSize="large" />
                <Typography variant="h6">Total Reviews</Typography>
                <Typography
                  color={theme.palette.primary.contrastText}
                  variant="subtitle1">
                  {totalReviews}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box
                color={theme.palette.info.main}
                display="flex"
                flexDirection="column"
                alignItems="center">
                <VerifiedUser fontSize="large" />
                <Typography variant="h6">Subscription Status</Typography>
                <Typography
                  color={theme.palette.primary.contrastText}
                  variant="subtitle1">
                  {auth.membershipStatus}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Rooms Section */}
        <Box margin={2} padding={2}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={4}
            mb={2}>
            <Typography
              color={theme.palette.success.main}
              variant={isMobile ? "h5" : "h4"}>
              Rooms
            </Typography>
          </Box>

          <Box mb={4}>
            <Divider />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="100%"
            mb={16}>
            <TableContainer
              component={Paper}
              sx={{
                borderRadius: 4,
                maxWidth: "70%",
              }}>
              <div style={{ overflowX: isMobile ? "auto" : "visible" }}>
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
                        align="center">
                        Avg. Rating
                      </TableCell>
                      <TableCell
                        sx={{ color: theme.palette.primary.contrastText }}
                        align="center">
                        Number of Entries
                      </TableCell>
                      <TableCell
                        sx={{ color: theme.palette.primary.contrastText }}
                        align="center">
                        Delete
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody
                    sx={{ bgcolor: theme.palette.primary.contrastText }}>
                    {products.map((product, index) => (
                      <TableRow
                        key={index}
                        hover
                        onClick={() => navigate(`/products/${product._id}`)}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          cursor: "pointer",
                          margin: "8px",
                        }}>
                        <TableCell component="th" scope="row">
                          {product.name}
                        </TableCell>
                        <TableCell align="center">
                          {product.averageRating.toFixed(1)}
                        </TableCell>
                        <TableCell align="center">
                          {product.reviews.length}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={(e) =>
                              handleDeleteProduct(e, product._id)
                            }>
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TableContainer>
            <Box mt={4}>
              <CreateRoomModal onSpaceCreated={handleSpaceCreated} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RoomsPage;

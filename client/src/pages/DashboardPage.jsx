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
  useTheme,
  Divider,
} from "@mui/material";
import {
  Person,
  VerifiedUser,
  Payment,
  Notifications,
} from "@mui/icons-material";

import CreateRoomModal from "../components/CreateRoomModal";
import { AuthContext } from "../context/auth-context";

const Dashboard = () => {
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
          `https://feedio-server.vercel.app/api/users/${auth.userId}/products/all`,
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
          `https://feedio-server.vercel.app/api/users/${auth.userId}`,
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

  const handleSpaceCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleManageBilling = async () => {
    try {
      const response = await axios.post(
        `https://feedio-server.vercel.app/api/users/${auth.userId}/payments/create-customer-portal-session`,
        {},
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );

      console.log(response);
      if (response.data && response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Box py={4}>
        {/* Overview Section */}
        <Box mb={8}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
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
                path: "https://billing.stripe.com/p/login/test_dR617p7Gs2DvesMfYY",
              },
              { icon: <Notifications />, label: "Notifications" },
            ].map(({ icon, label, path }, index) => (
              <Grid item xs={6} sm={2} key={index}>
                <Button
                  startIcon={icon}
                  href={label !== "Billing" ? path : undefined}
                  variant="outlined"
                  fullWidth={isMobile}
                  onClick={
                    label === "Billing" ? handleManageBilling : undefined
                  }>
                  {label}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box mb={4}>
          <Divider />
        </Box>

        {/* Rooms Section */}
        <Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={4}>
            <Typography variant={isMobile ? "h5" : "h4"}>Rooms</Typography>
          </Box>

          <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Room</TableCell>
                  <TableCell align="right">Avg. Reviews</TableCell>
                  <TableCell align="right">Number of Reviews</TableCell>
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
                      {product.reviews.length}
                    </TableCell>
                    <TableCell align="right">
                      {product.reviews.length}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <CreateRoomModal onSpaceCreated={handleSpaceCreated} />
    </Container>
  );
};

export default Dashboard;

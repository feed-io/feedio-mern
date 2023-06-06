import React, { useEffect, useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Typography, Fab, Container, Box, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

import { AuthContext } from "../context/auth-context";
import ProductList from "../components/dashboardPage/ProductList";
import CreateModal from "../components/dashboardPage/CreateModal";
import Avatar from "../components/dashboardPage/Avatar";
import styled from "@emotion/styled";

const StyledFab = styled(Fab)({
  position: "fixed",
  bottom: 16,
  right: 16,
});

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: 5,
});

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.primary,
  margin: "0px 10px",
}));

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [productId, setProductId] = useState("");
  const [openCreateProduct, setOpenCreateProduct] = useState(false);
  const [refreshProductList, setRefreshProductList] = useState(false);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${auth.userId}`,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );

        setUser(response.data.user);
        setUsername(response.data.user.username);
        setProductId(response.data.user.products[0]._id);
      } catch (error) {
        console.log("Error fetching testimonials data:", error.message);
      }
    };
    loadData();
  }, []);

  const handleCreateProduct = () => {
    handleCreateProductOpen();
  };

  const handleCreateProductOpen = () => {
    setOpenCreateProduct(true);
  };

  const handleCreateProductClose = () => {
    setOpenCreateProduct(false);
  };

  const handleProductCreated = () => {
    setRefreshProductList(!refreshProductList);
  };
  return (
    <Container>
      <StyledBox>
        <Box p={1}>
          <Avatar user={user} />
        </Box>
        <Box>
          <Typography variant="h4" component="h1">
            {username}
          </Typography>
        </Box>
      </StyledBox>
      <Box sx={{ display: "flex", justifyContent: "center", gap: "8px" }}>
        <Box>
          <Typography>
            <StyledLink to={`/profile/`}>Profile</StyledLink>
          </Typography>
        </Box>
        <Box>
          <Typography>
            <StyledLink>Settings</StyledLink>
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box>
        <Box p={5}>
          <Typography variant="h6" component="h3" textAlign="center">
            Spaces
          </Typography>
        </Box>
        <Box>
          <ProductList refresh={refreshProductList} />
        </Box>
      </Box>
      <Box>
        <StyledFab color="primary" onClick={handleCreateProduct}>
          <AddIcon />
        </StyledFab>
        <CreateModal
          onOpen={openCreateProduct}
          onClose={handleCreateProductClose}
          onProductCreated={handleProductCreated}
        />
      </Box>
    </Container>
  );
};
export default Dashboard;

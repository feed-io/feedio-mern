import React, { useEffect, useState, useContext, useRef } from "react";
import {
  Typography,
  Grid,
  Fab,
  Container,
  Box,
  Button,
  TextField,
  Toolbar,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

import { AuthContext } from "../context/auth-context";
import ProductList from "../components/dashboardPage/ProductList";
import CreateModal from "../components/dashboardPage/CreateModal";
import Avatar from "../components/dashboardPage/Avatar";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [productId, setProductId] = useState("");
  const [openCreateProduct, setOpenCreateProduct] = useState(false);
  const [refreshProductList, setRefreshProductList] = useState(false);
  const auth = useContext(AuthContext);
  const codeSnippetRef = useRef(null);

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

  const handleCopyToClipboard = () => {
    const codeSnippet = codeSnippetRef.current.value;
    navigator.clipboard.writeText(codeSnippet);
    alert("Code snippet copied to clipboard");
  };

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
    <Box sx={{ display: "flex" }}>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}>
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* User */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <Box sx={{ padding: "5px" }}>
                  <Avatar user={user} />
                </Box>
                <Box sx={{ padding: "5px" }}>
                  <Typography variant="h4" component="h1">
                    {username}
                  </Typography>
                </Box>
                <Box sx={{ padding: "5px" }}>
                  <Typography>
                    <Link to={`/profile/`} style={{ textDecoration: "none" }}>
                      Profile
                    </Link>
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            {/* Actions */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <Typography>
                  <Link
                    to={`/showRoom/` + productId}
                    style={{ textDecoration: "none" }}>
                    Show Room
                  </Link>
                </Typography>
                <Box sx={{ padding: "10px" }}>
                  <TextField
                    inputRef={codeSnippetRef}
                    multiline
                    rows={3}
                    variant="outlined"
                    value={`<iframe
            src="http://localhost:3000/showRoom/${productId}"
            title="Reviews Page"
            width="100%"
            height="800px"
            style={{
              border: "none",
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
              borderRadius: "10px",
              overflow: "hidden",
            }}
            />`}
                  />
                </Box>
                <Button variant="contained" onClick={handleCopyToClipboard}>
                  Copy to Clipboard
                </Button>
              </Paper>
            </Grid>
            {/* Spaces */}
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: "250px",
                }}>
                <Box>
                  <Box sx={{ paddingBottom: "15px" }}>
                    <Typography variant="h6" component="h3" textAlign="center">
                      Spaces
                    </Typography>
                  </Box>
                  <Box>
                    <ProductList refresh={refreshProductList} />
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        <Fab
          color="primary"
          style={{
            position: "fixed",
            bottom: 16,
            right: 16,
          }}
          onClick={handleCreateProduct}>
          <AddIcon />
        </Fab>
        {/* Create product dialog */}
        <CreateModal
          onOpen={openCreateProduct}
          onClose={handleCreateProductClose}
          onProductCreated={handleProductCreated}
        />
      </Box>
    </Box>
  );
};
export default Dashboard;

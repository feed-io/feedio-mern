import React, { useEffect, useState, useContext, useRef } from "react";
import {
  Typography,
  Box,
  Fab,
  Container,
  Button,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

import { AuthContext } from "../context/auth-context";
import ProductList from "../components/dashboardPage/ProductList";
import CreateModal from "../components/dashboardPage/CreateModal";
import Avatar from "../components/dashboardPage/Avatar";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [prodQuantity, setProdQuantity] = useState(0);
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
        setProdQuantity(response.data.user.products.length);
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
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          flexDirection: "column",
          gap: 4,
        }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "80%",
            mb: 3,
          }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "0.5rem",
            }}>
            <Avatar user={user} sx={{ mb: 1 }} />
            <Typography variant="h4" component="h1">
              {username}
            </Typography>
          </Box>
          <Typography>
            <Link to={`/profile/`} style={{ textDecoration: "none" }}>
              Profile
            </Link>
          </Typography>
          <Typography>
            <Link to="/showRoom" style={{ textDecoration: "none" }}>
              Show Room
            </Link>
          </Typography>
          <div>
            <Box sx={{ mt: 2 }}>
              <TextField
                inputRef={codeSnippetRef}
                multiline
                fullWidth
                rows={8}
                variant="outlined"
                value={`<iframe
  src="http://localhost:3000/reviews"
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
            <Box sx={{ mt: 1 }}>
              <Button variant="contained" onClick={handleCopyToClipboard}>
                Copy to Clipboard
              </Button>
            </Box>
          </div>
        </Box>
        <Typography variant="h6" component="h3" textAlign="center">
          Spaces
        </Typography>
        <ProductList refresh={refreshProductList} />
        <Fab
          color="primary"
          sx={{
            position: "fixed",
            bottom: 4,
            right: 4,
          }}
          onClick={handleCreateProduct}>
          <AddIcon />
        </Fab>
      </Box>
      {/* Create product dialog */}
      <CreateModal
        onOpen={openCreateProduct}
        onClose={handleCreateProductClose}
        onProductCreated={handleProductCreated}
      />
    </Container>
  );
}

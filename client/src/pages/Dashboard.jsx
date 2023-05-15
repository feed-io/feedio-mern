import React, { useEffect, useState, useContext, useRef } from "react";
import {
  Typography,
  Grid,
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
    <Grid
      container
      display="grid"
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh", border: "1px solid red" }}
      spacing={2}>
      {/* <Grid item xs={12} style={{ border: "1px solid green" }}> */}
      {/* <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          style={{ border: "1px solid yellow" }}>
          <Grid item>
            <Grid
              container
              display="grid"
              direction="column"
              alignItems="center">
              <Avatar user={user} sx={{ mb: 1 }} />
              <Typography variant="h4" component="h1">
                {username}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography>
              <Link to={`/profile/`} style={{ textDecoration: "none" }}>
                Profile
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              <Link
                to={`/showRoom/` + productId}
                style={{ textDecoration: "none" }}>
                Show Room
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              inputRef={codeSnippetRef}
              multiline
              fullWidth
              rows={8}
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
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleCopyToClipboard}>
              Copy to Clipboard
            </Button>
          </Grid>
        </Grid>
      </Grid> */}
      {/* <Grid style={{ border: "1px solid blue" }}>
        <Grid item xs={12}>
          <Typography variant="h6" component="h3" textAlign="center">
            Spaces
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ProductList refresh={refreshProductList} />
        </Grid>
      </Grid> */}
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
    </Grid>
  );
}

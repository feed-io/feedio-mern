import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import TheatersIcon from "@mui/icons-material/Theaters";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

import { AuthContext } from "../../context/auth-context";
import UpdateProductModal from "../productProfile/UpdateProductModal";

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const StyledButton = styled(Button)({
  margin: "8px",
  padding: "8px 16px",
});

const StyledListItem = styled(ListItem)({
  width: "fit-content",
  padding: 10,
});

const Sidebar = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const codeSnippetRef = useRef(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [currentProductName, setCurrentProductName] = useState(
    props.product.name
  );

  const handleCopyToClipboard = () => {
    const codeSnippet = codeSnippetRef.current.value;
    navigator.clipboard.writeText(codeSnippet);
    alert("Code snippet copied to clipboard");
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

  const handleOpenUpdateModal = () => {
    setUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
  };

  const handleProductUpdate = (updatedProduct) => {
    setCurrentProductName(updatedProduct);
    handleCloseUpdateModal();
  };

  useEffect(() => {
    setCurrentProductName(props.product);
  }, [props.product]);

  const handleDelete = async () => {
    await deleteProduct(auth.userId, props.product._id, auth.token);
    navigate("/dashboard");
  };

  return (
    <>
      <Box flex={2} p={2}>
        <Typography variant="h4" align="center" gutterBottom>
          {currentProductName}
        </Typography>
        <Divider />
        <List>
          <StyledListItem disablePadding>
            <ListItemButton
              component={Link}
              to={`/showRoom/` + props.product._id}>
              <ListItemIcon>
                <TheatersIcon />
              </ListItemIcon>
              <ListItemText primary="Show Room" />
            </ListItemButton>
          </StyledListItem>
          <ListItem disablePadding>
            <StyledBox>
              <TextField
                multiline
                inputRef={codeSnippetRef}
                rows={3}
                variant="outlined"
                value={`<iframe
              src="http://localhost:3000/showRoom/${props.product._id}"title="Reviews Page"width="100%"
              height="800px"
              style={{
                border: "none",
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
                borderRadius: "10px",
                overflow: "hidden",
              }}
      />`}
              />
              <StyledButton variant="contained" onClick={handleCopyToClipboard}>
                Copy to Clipboard
              </StyledButton>
            </StyledBox>
          </ListItem>
          <StyledListItem disablePadding>
            <ListItemButton component={Button} onClick={handleOpenUpdateModal}>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Edit" />
            </ListItemButton>
          </StyledListItem>
          <StyledListItem disablePadding>
            <ListItemButton component={Button} onClick={handleDelete}>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary="Delete" />
            </ListItemButton>
          </StyledListItem>
        </List>
      </Box>
      <Box>
        <UpdateProductModal
          open={isUpdateModalOpen}
          onClose={handleCloseUpdateModal}
          onProductUpdate={handleProductUpdate}
          productId={props.product._id}
        />
      </Box>
    </>
  );
};

export default Sidebar;

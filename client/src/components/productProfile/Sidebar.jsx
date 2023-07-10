import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import QuizIcon from "@mui/icons-material/Quiz";
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

const CenteredListItem = styled(ListItem)({
  justifyContent: "center",
});

const Sidebar = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const codeSnippetRef = useRef(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [currentProductName, setCurrentProductName] = useState(
    props.product.name
  );

  const handleCopySnippetToClipboard = () => {
    const codeSnippet = codeSnippetRef.current.value;
    navigator.clipboard.writeText(codeSnippet);
    alert("Code snippet copied to clipboard");
  };

  const handleCopyLinkToClipboard = () => {
    const link = `http://localhost:3000/reviewSpace/${props.product._id}`;
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard");
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

  const handleProductUpdate = (updatedProductName) => {
    setCurrentProductName(updatedProductName.data.product.name);
    handleCloseUpdateModal();
  };

  useEffect(() => {
    setCurrentProductName(props.product.name);
  }, [props.product.name]);

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
              component={Button}
              to={`/showRoom/` + props.product._id}>
              <ListItemIcon>
                <TheatersIcon />
              </ListItemIcon>
              <ListItemText primary="To show room" />
            </ListItemButton>
          </StyledListItem>
          <CenteredListItem disablePadding>
            <StyledBox>
              <TextField
                multiline
                inputRef={codeSnippetRef}
                rows={3}
                variant="outlined"
                value={`<iframe src="http://localhost:3000/showRoom/${props.product._id}"title="Reviews Page"width="100%"height="800px"style={{border:"none",boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",borderRadius: "10px",overflow: "hidden",}}/>`}
              />
              <StyledButton
                variant="contained"
                onClick={handleCopySnippetToClipboard}>
                Copy snippet
              </StyledButton>
            </StyledBox>
          </CenteredListItem>
          <CenteredListItem disablePadding>
            <StyledBox>
              <TextField
                variant="outlined"
                value={`http://localhost:3000/reviewSpace/${props.product._id}`}
              />
            </StyledBox>
          </CenteredListItem>
          <CenteredListItem disablePadding>
            <StyledBox>
              <StyledButton
                variant="contained"
                onClick={handleCopyLinkToClipboard}>
                Copy Link
              </StyledButton>
            </StyledBox>
          </CenteredListItem>
          <StyledListItem disablePadding>
            <ListItemButton
              component={Button}
              to={`/reviewSpace/` + props.product._id}>
              <ListItemIcon>
                <QuizIcon />
              </ListItemIcon>
              <ListItemText primary="To Form" />
            </ListItemButton>
          </StyledListItem>
          <StyledListItem disablePadding>
            <ListItemButton component={Button} onClick={handleOpenUpdateModal}>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Edit form" />
            </ListItemButton>
          </StyledListItem>
          <StyledListItem disablePadding>
            <ListItemButton component={Button} onClick={handleDelete}>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary="Delete Space" />
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

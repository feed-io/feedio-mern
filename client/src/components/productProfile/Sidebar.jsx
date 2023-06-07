import React, { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
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

const Sidebar = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const codeSnippetRef = useRef(null);

  const handleCopyToClipboard = () => {
    const codeSnippet = codeSnippetRef.current.value;
    navigator.clipboard.writeText(codeSnippet);
    alert("Code snippet copied to clipboard");
  };

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
    await updateProduct(
      auth.userId,
      props.productId,
      auth.token,
      updatedProduct
    );
  };

  const handleDelete = async () => {
    await deleteProduct(auth.userId, props.productId, auth.token);
    navigate("/dashboard");
  };

  return (
    <Box flex={2} p={2}>
      <Typography variant="h4" align="center" gutterBottom>
        {props.product.name}
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to={`/showRoom/` + props.product._id}>
            <ListItemIcon>
              <TheatersIcon />
            </ListItemIcon>
            <ListItemText primary="Show Room" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <StyledBox>
            <TextField
              multiline
              inputRef={codeSnippetRef}
              rows={3}
              variant="outlined"
              value={`<iframe
                    src="http://localhost:3000/showRoom/${props.product._id}"
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
            <StyledButton variant="contained" onClick={handleCopyToClipboard}>
              Copy to Clipboard
            </StyledButton>
          </StyledBox>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Button} onClick={handleUpdate}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Button} onClick={handleDelete}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;

//           <Grid item xs={12} sm={6}>
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//               }}>
//               <Card sx={{ width: "100%" }}>
//                 <CardContent>
//                   <Typography variant="subtitle1" component="p">
//                     Header: {product.header}
//                   </Typography>
//                   <Typography variant="subtitle1" component="p">
//                     Content: {product.content}
//                   </Typography>
//                   <Typography variant="subtitle1" component="p">
//                     {/* Image URL: {product.imageUrl} */}
//                   </Typography>
//                   <Typography variant="subtitle1" component="p">
//                     Questions:
//                   </Typography>
//                   <ul>
//                     {product.questions.map((question, index) => (
//                       <li key={index}>{question}</li>
//                     ))}

// import React, { useContext, useRef, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Box,
//   Button,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   TextField,
//   Typography,
//   styled,
//   Drawer,
//   useMediaQuery,
//   IconButton,
//   Toolbar,
// } from "@mui/material";
// import TheatersIcon from "@mui/icons-material/Theaters";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import MenuIcon from "@mui/icons-material/Menu";
// import axios from "axios";

// import { AuthContext } from "../../context/auth-context";

// const drawerWidth = 240;

// const StyledBox = styled(Box)(({ theme }) => ({
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledButton = styled(Button)({
//   margin: "8px",
//   padding: "8px 16px",
// });

// const Sidebar = (props) => {
//   const auth = useContext(AuthContext);
//   const navigate = useNavigate();
//   const codeSnippetRef = useRef(null);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const handleCopyToClipboard = () => {
//     const codeSnippet = codeSnippetRef.current.value;
//     navigator.clipboard.writeText(codeSnippet);
//     alert("Code snippet copied to clipboard");
//   };

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
//     const updatedProduct = {};
//     await updateProduct(
//       auth.userId,
//       props.productId,
//       auth.token,
//       updatedProduct
//     );
//   };

//   const handleDelete = async () => {
//     await deleteProduct(auth.userId, props.productId, auth.token);
//     navigate("/dashboard");
//   };

//   const drawer = (
//     <Box flex={2} p={2}>
//       <Typography variant="h4" align="center" gutterBottom>
//         {props.product.name}
//       </Typography>
//       <List>
//         <ListItem disablePadding>
//           <ListItemButton component={Link} to={`/showRoom/`}>
//             <ListItemIcon>
//               <TheatersIcon />
//             </ListItemIcon>
//             <ListItemText primary="Show Room" />
//           </ListItemButton>
//         </ListItem>
//         <ListItem disablePadding>
//           <StyledBox>
//             <TextField
//               multiline
//               inputRef={codeSnippetRef}
//               rows={3}
//               variant="outlined"
//               value={`<iframe
//       title="Reviews Page"
//       width="100%"
//       height="800px"
//       style={{
//         border: "none",
//         boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
//         borderRadius: "10px",
//         overflow: "hidden",
//       }}
//       />`}
//             />
//             <StyledButton variant="contained" onClick={handleCopyToClipboard}>
//               Copy to Clipboard
//             </StyledButton>
//           </StyledBox>
//         </ListItem>
//         <ListItem disablePadding>
//           <ListItemButton component={Button} onClick={handleUpdate}>
//             <ListItemIcon>
//               <EditIcon />
//             </ListItemIcon>
//             <ListItemText primary="Edit" />
//           </ListItemButton>
//         </ListItem>
//         <ListItem disablePadding>
//           <ListItemButton component={Button} onClick={handleDelete}>
//             <ListItemIcon>
//               <DeleteIcon />
//             </ListItemIcon>
//             <ListItemText primary="Delete" />
//           </ListItemButton>
//         </ListItem>
//       </List>
//     </Box>
//   );

//   return (
//     <Box flex={2} p={2}>
//       {isMobile ? (
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true, // Better open performance on mobile.
//           }}>
//           {drawer}
//         </Drawer>
//       ) : (
//         <Drawer variant="permanent" open>
//           {drawer}
//         </Drawer>
//       )}
//       {isMobile && (
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}>
//             <MenuIcon />
//           </IconButton>
//         </Toolbar>
//       )}
//     </Box>
//   );
// };

// export default Sidebar;

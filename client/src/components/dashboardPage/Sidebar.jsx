import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";

const Sidebar = () => {
  return (
    <Box flex={2} p={2}>
      <List>
        <ListItem disablePadding>
          <ListItemButton component="a">
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a">
            <ListItemIcon>
              <SettingsSuggestIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a">
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a">
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a">
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;

//         <Box sx={{ padding: "5px" }}>
//           <Avatar user={user} />
//         </Box>
//         <Box sx={{ padding: "5px" }}>
//           <Typography variant="h4" component="h1">
//             {username}
//           </Typography>
//         </Box>
// {/* <Box sx={{ padding: "5px" }}> */}
//           <Typography>
//             <Link to={`/profile/`} style={{ textDecoration: "none" }}>
//               Profile
//             </Link>
//           </Typography>
//         </Box>
//       </Paper>
//     </Grid>
//     {/* Actions */}
//     <Grid item xs={12} md={8} lg={9}>
//       <Paper
//         sx={{
//           p: 2,
//           display: "flex",
//           flexDirection: "column",
//           height: 240,
//           alignItems: "center",
//           justifyContent: "center",
//         }}>
//         <Typography>
//           <Link
//             to={`/showRoom/` + productId}
//             style={{ textDecoration: "none" }}>
//             Show Room
//           </Link>
//         </Typography>
//         <Box sx={{ padding: "10px" }}>
//           <TextField
//             inputRef={codeSnippetRef}
//             multiline
//             rows={3}
//             variant="outlined"
//             value={`<iframe
//       src="http://localhost:3000/showRoom/${productId}"
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
//           />
//         </Box>
//         <Button variant="contained" onClick={handleCopyToClipboard}>
//           Copy to Clipboard
//         </Button>
//       </Paper>
//     </Grid>

// const handleCopyToClipboard = () => {
//   const codeSnippet = codeSnippetRef.current.value;
//   navigator.clipboard.writeText(codeSnippet);
//   alert("Code snippet copied to clipboard");
// };
// const codeSnippetRef = useRef(null);
//

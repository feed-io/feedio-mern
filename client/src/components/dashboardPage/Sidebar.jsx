import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";

const Sidebar = () => {
  return (
    <Box bgcolor="red" flex={2} p={2}>
      <List>
        <ListItem disablePadding>
          <ListItemButton component="a">
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Homepage" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;

import * as React from "react";
// import { Link as RouterLink } from "react-router-dom";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        elevation={0}
        style={{ backgroundColor: "#F5F5F5", color: "#2E3840" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0.5 }}>
            Feed
          </Typography>
          <Link
            to="/pricing"
            style={{
              textDecoration: "none",
              marginRight: "1.5rem",
              color: "inherit",
            }}>
            Pricing
          </Link>
          <Link
            to="/features"
            style={{
              textDecoration: "none",
              marginRight: "1.5rem",
              color: "inherit",
            }}>
            Features
          </Link>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 0.5 }}></Typography>
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              marginRight: "1.5rem",
              color: "inherit",
            }}>
            Login
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;

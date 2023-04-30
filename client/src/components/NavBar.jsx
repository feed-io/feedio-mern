import { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import AuthModal from "./AuthModal";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
            onClick={handleOpen}
            style={{
              textDecoration: "none",
              marginRight: "1.5rem",
              color: "inherit",
            }}>
            Login
          </Link>
        </Toolbar>
      </AppBar>
      <AuthModal open={open} handleClose={handleClose} />
    </Box>
  );
};

export default NavBar;

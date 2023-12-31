import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material";
import axios from "axios";

import { AuthContext } from "../context/auth-context";
import FeedioLogo from "../assets/feedioLogo.svg";
import Logo from "../assets/logo.svg";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const NavBar = () => {
  const auth = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [openMenu, setOpenMenu] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (auth.userId) {
      axios
        .get(`${SERVER_URL}/api/users/${auth.userId}`, {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        })
        .then((response) => {
          setUserName(response.data.user.name);
        })
        .catch((error) => {
          console.error("There was an error fetching the user data:", error);
        });
    }
  }, [auth.userId, auth.token]);

  const getInitials = (name) => {
    if (!name) return "";
    const names = name.split(" ");
    const initials = names.map((n) => n.charAt(0)).join("");
    return initials.toUpperCase();
  };

  const initials = getInitials(userName);
  const avatarUrl = `https://ui-avatars.com/api/?name=${initials}&background=FFEEB4&color=0F2830`;

  return (
    <>
      <AppBar
        sx={{
          bgcolor: theme.palette.success.main,
          position: "static",
        }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Typography variant="h6">
            <Button
              component={Link}
              to="/"
              sx={{
                color: theme.palette.primary.contrastText,
                textDecoration: "none",
                textTransform: "none",
              }}>
              <img
                src={isMobile ? Logo : FeedioLogo}
                alt="Feedio Logo"
                style={{ width: isMobile ? "40px" : "120px" }}
              />
            </Button>
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}>
            {auth.isLoggedIn ? null : (
              <>
                <Button
                  component={Link}
                  to="/features"
                  sx={{
                    color: theme.palette.primary.contrastText,
                    textDecoration: "none",
                    textTransform: "none",
                  }}>
                  Features
                </Button>
                <Button
                  component={Link}
                  to="/pricing"
                  sx={{
                    textDecoration: "none",
                    color: theme.palette.primary.contrastText,
                    textTransform: "none",
                  }}>
                  Pricing
                </Button>
              </>
            )}
          </Box>
          {!auth.isLoggedIn ? (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="secondary">
              Login
            </Button>
          ) : (
            <Tooltip title="Options">
              <Box onClick={(e) => setOpenMenu(e.currentTarget)}>
                <Avatar alt={userName} src={avatarUrl} />
              </Box>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
      <Menu
        id="demo-positioned-menu"
        anchorEl={openMenu}
        open={Boolean(openMenu)}
        onClose={() => setOpenMenu(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}>
        <MenuItem
          component={Link}
          to="/dashboard"
          onClick={() => setOpenMenu(null)}>
          Home
        </MenuItem>
        <MenuItem
          component={Link}
          to="/"
          onClick={() => {
            setOpenMenu(null);
            auth.logout();
          }}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default NavBar;

import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Toolbar,
  Typography,
  Box,
  styled,
  Menu,
  MenuItem,
  Button,
  Tooltip,
} from "@mui/material";

import { AuthContext } from "../context/auth-context";
import AuthModal from "./AuthModal";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.main,
  margin: "0px 10px",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const NavBar = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const auth = useContext(AuthContext);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: (theme) => theme.palette.background.paper,
          boxShadow: "none",
          position: "static",
        }}>
        <StyledToolbar>
          <Typography variant="h6">
            <StyledLink to="/">Feedio</StyledLink>
          </Typography>
          <StyledBox>
            {auth.isLoggedIn ? null : (
              <>
                <StyledLink to="/features">Features</StyledLink>
                <StyledLink to="/pricing">Pricing</StyledLink>
              </>
            )}
          </StyledBox>

          {!auth.isLoggedIn ? (
            <StyledButton
              variant="contained"
              color="secondary"
              onClick={handleOpenModal}>
              Login
            </StyledButton>
          ) : (
            <Tooltip title="User Settings">
              <StyledBox onClick={(e) => setOpenMenu(e.currentTarget)}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </StyledBox>
            </Tooltip>
          )}
        </StyledToolbar>
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
          Dashboard
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
      <AuthModal open={openModal} handleClose={handleCloseModal} />
    </>
  );
};

export default NavBar;

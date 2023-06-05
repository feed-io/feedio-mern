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
} from "@mui/material";
import { AuthContext } from "../context/auth-context";
import AuthModal from "./auth/AuthModal";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.primary,
  margin: "0px 10px",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
}));

const NavBar = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
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
          backgroundColor: (theme) => theme.palette.background.default,
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
                <StyledLink to="/pricing">Pricing</StyledLink>
                <StyledLink to="/features">Features</StyledLink>
              </>
            )}
          </StyledBox>

          {!auth.isLoggedIn ? (
            <StyledLink onClick={handleOpenModal}>Login</StyledLink>
          ) : (
            <StyledBox onClick={(e) => setOpenMenu(true)}>
              <StyledLink to="/dashboard">Dashboard</StyledLink>
              <StyledLink to="/" onClick={auth.logout}>
                Logout
              </StyledLink>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </StyledBox>
          )}
        </StyledToolbar>
      </AppBar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={openMenu}
        onClose={(e) => setOpenMenu(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}>
        <MenuItem onClick={(e) => setOpenMenu(false)}>Profile</MenuItem>
        <MenuItem onClick={(e) => setOpenMenu(false)}>My account</MenuItem>
        <MenuItem onClick={() => setOpenMenu(false)}>Logout</MenuItem>
      </Menu>
      <AuthModal open={openModal} handleClose={handleCloseModal} />
    </>
  );
};

export default NavBar;

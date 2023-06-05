import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { AuthContext } from "../context/auth-context";
import AuthModal from "./auth/AuthModal";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
    // fontFamily: theme.typography.fontFamily,
    margin: "0px 10px",
  },
  box: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const auth = useContext(AuthContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
          boxShadow: "none",
          position: "static",
        }}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6">
            <Link to="/" className={classes.link}>
              Feedio
            </Link>
          </Typography>
          <div className={classes.box}>
            {auth.isLoggedIn ? null : (
              <>
                <Link to="/pricing" className={classes.link}>
                  Pricing
                </Link>
                <Link to="/features" className={classes.link}>
                  Features
                </Link>
              </>
            )}
          </div>

          {!auth.isLoggedIn ? (
            <Link onClick={handleOpen} className={classes.link}>
              Login
            </Link>
          ) : (
            <div className={classes.box}>
              <Link to="/dashboard" className={classes.link}>
                Dashboard
              </Link>
              <Link to="/" onClick={auth.logout} className={classes.link}>
                Logout
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <AuthModal open={open} handleClose={handleClose} />
    </>
  );
};

export default NavBar;

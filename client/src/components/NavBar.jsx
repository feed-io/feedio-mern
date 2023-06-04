import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

import { AuthContext } from "../context/auth-context";
import AuthModal from "./auth/AuthModal";

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: theme.palette.background.default,
    boxShadow: "none",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
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
      <AppBar className={classes.appbar}>
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
            <>
              <Link to="/dashboard" className={classes.link}>
                Dashboard
              </Link>
              <Link to="/" onClick={auth.logout} className={classes.link}>
                Logout
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
      <AuthModal open={open} handleClose={handleClose} />
    </>
  );
};

export default NavBar;
// {/* <AppBar
//   position="static"
//   elevation={0}
//   style={{ backgroundColor: "#F5F5F5", color: "#2E3840" }}>
//   <Toolbar>
//     <Typography variant="h6" component="div" sx={{ flexGrow: 0.5 }}>
//       <Link
//         to="/"
//         style={{
//           textDecoration: "none",
//           marginRight: "1.5rem",
//           color: "inherit",
//         }}>
//         Feed
//       </Link>
//     </Typography>

// {auth.isLoggedIn ? null : (
//   <>
//     <Link
//       to="/pricing"
//       style={{
//         textDecoration: "none",
//         marginRight: "1.5rem",
//         color: "inherit",
//       }}>
//       Pricing
//     </Link>
//     <Link
//       to="/features"
//       style={{
//         textDecoration: "none",
//         marginRight: "1.5rem",
//         color: "inherit",
//       }}>
//       Features
//     </Link>
//   </>
// )}

// {!auth.isLoggedIn ? (
//   <Link
//     onClick={handleOpen}
//     style={{
//       textDecoration: "none",
//       marginRight: "1.5rem",
//       color: "inherit",
//     }}>
//     Login
//   </Link>
// ) : (
//   <>
//     <Link
//       to="/dashboard"
//       style={{
//         textDecoration: "none",
//         marginRight: "1.5rem",
//         color: "inherit",
//       }}>
//       Dashboard
//     </Link>
//     <Link
//       to="/"
//       onClick={auth.logout}
//       style={{
//         textDecoration: "none",
//         marginRight: "1.5rem",
//         color: "inherit",
//       }}>
//       Logout
//     </Link>
//   </>
// )}
//   </Toolbar>
// </AppBar>
// <AuthModal open={open} handleClose={handleClose} /> */}

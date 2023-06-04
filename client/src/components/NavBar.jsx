import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography } from "@material-ui/core";
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
    <AppBar>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">
          <Link to="/" className={classes.link}>
            Feedio
          </Link>
        </Typography>
        <div></div>
      </Toolbar>
    </AppBar>
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

//     {auth.isLoggedIn ? null : (
//       <>
//         <Link
//           to="/pricing"
//           style={{
//             textDecoration: "none",
//             marginRight: "1.5rem",
//             color: "inherit",
//           }}>
//           Pricing
//         </Link>
//         <Link
//           to="/features"
//           style={{
//             textDecoration: "none",
//             marginRight: "1.5rem",
//             color: "inherit",
//           }}>
//           Features
//         </Link>
//       </>
//     )}

//     {!auth.isLoggedIn ? (
//       <Link
//         onClick={handleOpen}
//         style={{
//           textDecoration: "none",
//           marginRight: "1.5rem",
//           color: "inherit",
//         }}>
//         Login
//       </Link>
//     ) : (
//       <>
//         <Link
//           to="/dashboard"
//           style={{
//             textDecoration: "none",
//             marginRight: "1.5rem",
//             color: "inherit",
//           }}>
//           Dashboard
//         </Link>
//         <Link
//           to="/"
//           onClick={auth.logout}
//           style={{
//             textDecoration: "none",
//             marginRight: "1.5rem",
//             color: "inherit",
//           }}>
//           Logout
//         </Link>
//       </>
//     )}
//   </Toolbar>
// </AppBar>
// <AuthModal open={open} handleClose={handleClose} /> */}

import React from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  const location = useLocation();
  const shouldShowNavAndFooter =
    !location.pathname.includes("/reviewSpace/") &&
    !location.pathname.includes("/showRoom/");

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {shouldShowNavAndFooter && <NavBar />}
      <Box
        flex="1"
        pt={2}
        pb={2}
        px={2}
        sx={(theme) => ({
          backgroundColor: theme.palette.background.default,
        })}>
        <main>{children}</main>
      </Box>
      {shouldShowNavAndFooter && <Footer />}
    </Box>
  );
};

export default Layout;

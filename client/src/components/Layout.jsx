import React from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  const location = useLocation();
  const shouldShowNavAndFooter =
    !location.pathname.includes("/reviewSpace/") &&
    !location.pathname.includes("/showRoom/") &&
    !location.pathname.includes("/products/");

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {shouldShowNavAndFooter && <NavBar />}
      <main>{children}</main>
      {shouldShowNavAndFooter && <Footer />}
    </Box>
  );
};

export default Layout;

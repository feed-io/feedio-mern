import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Pricing from "./pages/Pricing";
import FeaturesPage from "./pages/Features";
import Dashboard from "./pages/Dashboard";
import ProductProfile from "./pages/ProductProfile";
import Profile from "./components/userProfile/UserProfile";
import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";
import ReviewsWidget from "./templates/ReviewsWidget";
import ReviewSpace from "./templates/ReviewSpace";
import Membership from "./components/settings/Membership";
import Success from "./components/settings/Success";
import Cancel from "./components/settings/Cancelation";

const App = () => {
  const {
    token,
    login,
    logout,
    userId,
    membershipStatus,
    updateMembershipStatus,
  } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/products/:productId" element={<ProductProfile />} />
        <Route path="/showRoom/:productId" element={<ReviewsWidget />} />
        <Route path="/reviewSpace/:productId" element={<ReviewSpace />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/features" element={<FeaturesPage />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
        membershipStatus: membershipStatus,
        updateMembershipStatus: updateMembershipStatus,
      }}>
      <Router>
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <NavBar />
          <Box
            flex="1"
            pt={2}
            pb={2}
            px={2}
            sx={(theme) => ({
              backgroundColor: theme.palette.background.default,
            })}>
            <main>{routes}</main>
          </Box>
          <Footer />
        </Box>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

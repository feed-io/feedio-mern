import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import CancelationPage from "./pages/CancelationPage";
import SuccessPage from "./pages/SuccessPage";
import LandingPage from "./pages/LandingPage";
import PricingPage from "./pages/PricingPage";
import FeaturesPage from "./pages/FeaturesPage";
import DashboardPage from "./pages/DashboardPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import RoomPage from "./pages/RoomPage";
import UserProfilePage from "./pages/UserProfilePage";
import ReviewsWidget from "./templates/ReviewsWidget";
import FeedbackPage from "./templates/FeedbackPage";
import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";

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
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/membership" element={<SubscriptionPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelationPage />} />
        <Route path="/products/:productId" element={<RoomPage />} />
        <Route path="/showRoom/:productId" element={<ReviewsWidget />} />
        <Route path="/reviewSpace/:productId" element={<FeedbackPage />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
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

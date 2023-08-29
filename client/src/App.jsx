import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import CancelationPage from "./pages/CancelationPage";
import SuccessPage from "./pages/SuccessPage";
import LandingPage from "./pages/LandingPage";
import PricingPage from "./pages/PricingPage";
import FeaturesPage from "./pages/FeaturesPage";
import RoomsPage from "./pages/RoomsPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import DashboardPage from "./pages/DashboardPage";
import UserProfilePage from "./pages/UserProfilePage";
import ReviewsWidget from "./templates/ReviewsWidget";
import FeedbackPage from "./templates/FeedbackPage";
import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";

const App = () => {
  const {
    token,
    login,
    signup,
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
        <Route path="/dashboard" element={<RoomsPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/membership" element={<SubscriptionPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelationPage />} />
        <Route path="/products/:productId" element={<DashboardPage />} />
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
        signup: signup,
        logout: logout,
        membershipStatus: membershipStatus,
        updateMembershipStatus: updateMembershipStatus,
      }}>
      <Router>
        <Layout>{routes}</Layout>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

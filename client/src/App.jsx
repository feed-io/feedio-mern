import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Pricing from "./pages/Pricing";
import FeaturesPage from "./pages/Features";
import Dashboard from "./pages/Dashboard";
import ProductProfile from "./pages/ProductProfile";
import Profile from "./pages/UserProfile";
import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";
import ReviewsWidget from "./templates/ReviewsWidget";

const App = () => {
  const { token, login, logout, userId } = useAuth();
  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products/:productId" element={<ProductProfile />} />
        <Route path="/showRoom" element={<ReviewsWidget />} />
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
      }}>
      <Router>
        <NavBar />
        <main>{routes}</main>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

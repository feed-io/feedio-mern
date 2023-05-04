import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Pricing from "./pages/Pricing";
import FeaturesPage from "./pages/Features";
import Profile from "./pages/Profile";
import { AuthContext } from "./context/auth-context";

const App = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/profile" element={<Profile />} />
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

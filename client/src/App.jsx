import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Pricing from "./pages/Pricing";
import FeaturesPage from "./pages/Features";
import Dashboard from "./pages/Dashboard";
import { AuthContext } from "./context/auth-context";
import { UserDataContext } from "./context/userData-context";

const App = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [productId, setProductId] = useState([]);

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

  const addProduct = useCallback((newItem) => {
    if (newItem && !productId.includes(newItem)) {
      setProductId((previous) => [...previous, newItem]);
    }
  }, []);
  // setProductId([]);
  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
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
      <UserDataContext.Provider
        value={{
          productId: productId,
          addProduct: addProduct,
        }}>
        <Router>
          <NavBar />
          <main>{routes}</main>
          <Footer />
        </Router>
      </UserDataContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;

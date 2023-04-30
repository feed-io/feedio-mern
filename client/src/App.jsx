import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Pricing from "./pages/Pricing";
import FeaturesPage from "./pages/Features";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/user" element={<Profile />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;

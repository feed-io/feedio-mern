import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Pricing from "./pages/Pricing";
import FeaturesPage from "./pages/Features";
import Profile from "./pages/Profile";
import useToken from "./hooks/useToken";

const App = () => {
  const { token, setToken } = useToken();

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route
            path="/user"
            element={token ? <Profile /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;

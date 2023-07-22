import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, GlobalStyles } from "@mui/material";

import App from "./App";
import theme from "./themes/theme";

const globalStyles = {
  body: {
    margin: 0,
    padding: 0,
  },
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={globalStyles} />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

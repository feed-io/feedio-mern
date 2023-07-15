import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    error: {
      main: "#f44336",
    },
    background: {
      default: "#E1FAF9",
      secondary: "#E1FAF9",
    },
    text: {
      primary: "#000000",
      secondary: "#000000",
    },
    success: {
      main: "#4caf50",
    },
  },
});

export default theme;

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
      default: "#023C40",
      secondary: "#E1FAF9",
    },
    text: {
      primary: "#000000",
      secondary: "#f5f5f5",
    },
    success: {
      main: "#4caf50",
    },
  },
});

export default theme;

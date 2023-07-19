import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2962ff",
    },
    secondary: {
      main: "#6a1b9a",
    },
    error: {
      main: "#d32f2f",
    },
    success: {
      main: "#388e3c",
    },
    background: {
      default: "#f5f5f5",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
  },
  typography: {
    fontFamily: [
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
      color: "#212121",
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 700,
      color: "#212121",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      color: "#757575",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      color: "#757575",
    },
  },
});

export default theme;

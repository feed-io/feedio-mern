import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0F2830", // Firefly
      contrastText: "#F8FBFF", // Zircon
    },
    secondary: {
      main: "#00D37F", // Green
      contrastText: "#F8FBFF", // Zircon
    },
    error: {
      main: "#FFEEB4", // Banana Yellow
      contrastText: "#0F2830", // Firefly
    },
    warning: {
      main: "#D2C4FB", // Lilac
      contrastText: "#0F2830", // Firefly
    },
    info: {
      main: "#AFF8C8", // Mint
      contrastText: "#0F2830", // Firefly
    },
    success: {
      main: "#014751", // Emerald
      contrastText: "#F8FBFF", // Zircon
    },
  },
  gradients: {
    top: "linear-gradient(0deg, #AFF8C8, #D2C4FB, #0F2830, #FFEEB4, #00D37F)",
    right:
      "linear-gradient(90deg, #AFF8C8, #D2C4FB, #0F2830, #FFEEB4, #00D37F)",
    bottom:
      "linear-gradient(180deg, #AFF8C8, #D2C4FB, #0F2830, #FFEEB4, #00D37F)",
    left: "linear-gradient(270deg, #AFF8C8, #D2C4FB, #0F2830, #FFEEB4, #00D37F)",
    topRight:
      "linear-gradient(45deg, #AFF8C8, #D2C4FB, #0F2830, #FFEEB4, #00D37F)",
    bottomRight:
      "linear-gradient(135deg, #AFF8C8, #D2C4FB, #0F2830, #FFEEB4, #00D37F)",
    topLeft:
      "linear-gradient(225deg, #AFF8C8, #D2C4FB, #0F2830, #FFEEB4, #00D37F)",
    bottomLeft:
      "linear-gradient(315deg, #AFF8C8, #D2C4FB, #0F2830, #FFEEB4, #00D37F)",
    radial: "radial-gradient(#AFF8C8, #D2C4FB, #0F2830, #FFEEB4, #00D37F)",
  },
  typography: {
    fontFamily: "Nunito, sans-serif",
    fontWeightLight: 200,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontWeight: 900, // Nunito Black
    },
    h2: {
      fontWeight: 800, // Nunito Extra-Bold
    },
    h3: {
      fontWeight: 700, // Nunito Bold
    },
    h4: {
      fontWeight: 600, // Nunito Semi-Bold
    },
    h5: {
      fontWeight: 400, // Nunito Regular
    },
    h6: {
      fontWeight: 300, // Nunito Light
    },
    subtitle1: {
      fontWeight: 200, // Nunito Extra-Light
    },
  },
});

export default theme;

import { createTheme } from "@mui/material/styles";

const getButtonVariants = (palette) => [
  {
    props: { variant: "primary" },
    style: {
      backgroundColor: palette.primary.main,
      color: palette.primary.contrastText,
      "&:hover": {
        backgroundColor: palette.warning.main,
        color: palette.primary.main,
      },
    },
  },
  {
    props: { variant: "secondary" },
    style: {
      backgroundColor: palette.secondary.main,
      color: palette.primary.contrastText,
      "&:hover": {
        backgroundColor: palette.third.main,
        color: palette.primary.main,
      },
    },
  },
  {
    props: { variant: "warning" },
    style: {
      backgroundColor: palette.primary.main,
      color: palette.primary.contrastText,
      "&:hover": {
        backgroundColor: palette.error.main,
        color: palette.primary.main,
      },
    },
  },
  {
    props: { variant: "contrast" },
    style: {
      backgroundColor: palette.primary.contrastText,
      color: palette.primary.main,
      "&:hover": {
        backgroundColor: palette.grey[200],
      },
    },
  },
];

const theme = createTheme({
  palette: {
    background: {
      default: "#151719",
    },
    primary: {
      main: "#0F2830", // Firefly
      contrastText: "#F8FBFF", // Zircon
    },
    secondary: {
      main: "#00D37F", // Green
      contrastText: "#F8FBFF", // Zircon
    },
    third: {
      main: "#FFEEB4", // Banana Yellow
      contrastText: "#0F2830", // Firefly
    },
    error: {
      main: "#FF3864", // Folly
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

theme.components = {
  MuiContainer: {
    styleOverrides: {
      root: {
        "@media (min-width: 600px)": {
          paddingLeft: 0, // Override padding for medium screens and up
          paddingRight: 0,
        },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: "25px",
      },
    },
    variants: getButtonVariants(theme.palette),
  },
};

export default theme;

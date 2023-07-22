import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#023047ff",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#fb8500ff",
      contrastText: "#ffffff",
    },
    error: {
      main: "#ff6347",
      contrastText: "#000000",
    },
    warning: {
      main: "#219ebcff",
      contrastText: "#ffffff",
    },
    info: {
      main: "#8ecae6ff",
      contrastText: "#000000",
    },
  },
  gradients: {
    top: "linear-gradient(0deg, #8ecae6ff, #219ebcff, #023047ff, #ffb703ff, #fb8500ff)",
    right:
      "linear-gradient(90deg, #8ecae6ff, #219ebcff, #023047ff, #ffb703ff, #fb8500ff)",
    bottom:
      "linear-gradient(180deg, #8ecae6ff, #219ebcff, #023047ff, #ffb703ff, #fb8500ff)",
    left: "linear-gradient(270deg, #8ecae6ff, #219ebcff, #023047ff, #ffb703ff, #fb8500ff)",
    topRight:
      "linear-gradient(45deg, #8ecae6ff, #219ebcff, #023047ff, #ffb703ff, #fb8500ff)",
    bottomRight:
      "linear-gradient(135deg, #8ecae6ff, #219ebcff, #023047ff, #ffb703ff, #fb8500ff)",
    topLeft:
      "linear-gradient(225deg, #8ecae6ff, #219ebcff, #023047ff, #ffb703ff, #fb8500ff)",
    bottomLeft:
      "linear-gradient(315deg, #8ecae6ff, #219ebcff, #023047ff, #ffb703ff, #fb8500ff)",
    radial:
      "radial-gradient(#8ecae6ff, #219ebcff, #023047ff, #ffb703ff, #fb8500ff)",
  },
});

export default theme;

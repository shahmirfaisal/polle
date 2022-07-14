import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  },
  palette: {
    primary: { main: "#00AB55" },
    background: {
      default: "#fdfdfd",
    },
    // mode: "dark",
  },
});

export default theme;

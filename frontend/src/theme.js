import { createTheme } from "@material-ui/core";

var primary = "#01f70d";
var secondary = "#c8f888";

const theme = createTheme({
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
  },
  typography: {
    fontFamily: `"Roboto", sans-serif`,
    fontSize: 16,
  },
});

export default theme;

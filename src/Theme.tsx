//React Imports
import React, { FC } from "react";

//Redux Imports
import { useDispatch, useSelector } from "react-redux";
import { getIsDarkMode, toggleDarkMode } from "./Redux";

//Material UI Imports
import {
  createMuiTheme,
  ThemeProvider,
  useMediaQuery,
  CssBaseline,
} from "@material-ui/core";
import { amber, lightBlue } from "@material-ui/core/colors";

export const alternativeFont = "Arial, sans-serif";

const Theme: FC = ({ children }) => {
  const dispatch = useDispatch();

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const isDarkMode = useSelector(getIsDarkMode);
  if (isDarkMode === null && prefersDarkMode) {
    dispatch(toggleDarkMode(prefersDarkMode));
  }

  const theme = createMuiTheme({
    overrides: {
      MuiTooltip: {
        arrow: {
          color: "rgb(0, 0, 0, 0.76)",
        },
        tooltip: {
          fontFamily: alternativeFont,
          fontWeight: 600,
          fontSize: "0.72rem",
          backgroundColor: "rgb(0, 0, 0, 0.76)",
        },
      },
      MuiList: {
        root: {
          fontFamily: "Roboto, sans-serif",
        },
      },
    },
    palette: {
      type: isDarkMode ? "dark" : "light",
      primary: lightBlue,
      secondary: {
        main: amber[700],
        dark: amber[500],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Theme;

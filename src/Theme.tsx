//React Imports
import React, { FC } from "react";

//Redux Imports
import { useSelector } from "react-redux";
import {
  getColors,
  getDirection,
  getIsDarkMode,
  getShades,
  getSpacing,
  toggleDarkMode,
} from "./Redux";
import { DEFAULT_DIRECTION, DEFAULT_SPACING } from "./Redux/display.slice";
import { useAppDispatch } from "./Store";

//Material UI Imports
import {
  createTheme,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  useMediaQuery,
  CssBaseline,
} from "@mui/material";
import * as muiColors from "@mui/material/colors";
import createSpacing from "@mui/system/createTheme/createSpacing";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

export const alternativeFont = "Arial, sans-serif";

const ThemeComponent: FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const colors = useSelector(getColors);
  const shades = useSelector(getShades);
  const spacing = useSelector(getSpacing);
  const direction = useSelector(getDirection);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const isDarkMode = useSelector(getIsDarkMode);
  if (isDarkMode === null && prefersDarkMode) {
    dispatch(toggleDarkMode(prefersDarkMode));
  }

  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
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
      },
      MuiList: {
        styleOverrides: {
          root: {
            fontFamily: "Roboto, sans-serif",
          },
        },
      },
    },
    direction: direction ?? DEFAULT_DIRECTION,
    spacing: createSpacing(spacing ?? DEFAULT_SPACING),
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: {
        main: muiColors[colors.primary][shades.primary],
      },
      secondary: {
        main: muiColors[colors.secondary][shades.secondary],
      },
    },
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeComponent;

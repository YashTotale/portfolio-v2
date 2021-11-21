//React Imports
import React, { FC } from "react";
import { useDisplay } from "./Context/DisplayContext";

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
  const { display, changeDisplay } = useDisplay();

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  if (display.darkMode === null && prefersDarkMode) {
    changeDisplay({ darkMode: true });
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
    direction: display.direction,
    spacing: createSpacing(parseInt(display.spacing.toString())),
    palette: {
      mode: display.darkMode ? "dark" : "light",
      primary: {
        main: muiColors[display.theme.primary.color][
          display.theme.primary.shade
        ],
      },
      secondary: {
        main: muiColors[display.theme.secondary.color][
          display.theme.secondary.shade
        ],
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

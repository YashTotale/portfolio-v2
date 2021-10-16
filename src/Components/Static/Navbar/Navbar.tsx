// React Imports
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useClosableSnackbar } from "../../../Hooks";
import { SIDEBAR_WIDTH } from "../../../Utils/constants";
import { generateSearch } from "../../../Utils/funcs";

// Redux Imports
import { toggleDarkMode, toggleSidebar } from "../../../Redux";
import { useAppDispatch } from "../../../Store";

// Material UI Imports
import {
  makeStyles,
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  useTheme,
  useMediaQuery,
  useScrollTrigger,
} from "@material-ui/core";
import {
  Brightness7,
  Brightness4,
  Menu as MenuButton,
  Palette,
  Settings,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: theme.palette.background.default,
  },
  toolbar: {
    margin: 0,
    [theme.breakpoints.up("lg")]: {
      marginLeft: theme.direction === "ltr" ? SIDEBAR_WIDTH : 0,
      marginRight: theme.direction === "rtl" ? SIDEBAR_WIDTH : 0,
    },
  },
  otherIcons: {
    marginLeft: theme.direction === "ltr" ? "auto" : 0,
    marginRight: theme.direction === "rtl" ? "auto" : 0,
  },
  avatar: {
    cursor: "pointer",
  },
}));

const Navbar: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { enqueueSnackbar } = useClosableSnackbar();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const isSizeSmall = useMediaQuery(theme.breakpoints.down("md"));
  const isDarkMode = theme.palette.type === "dark";
  const isLTR = theme.direction === "ltr";

  const toggleSidebarButton = (
    <div>
      <Tooltip title="Toggle Sidebar">
        <IconButton onClick={() => dispatch(toggleSidebar())}>
          <MenuButton />
        </IconButton>
      </Tooltip>
    </div>
  );

  return (
    <>
      <AppBar elevation={trigger ? 4 : 1} className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          {isSizeSmall && isLTR && toggleSidebarButton}
          <div className={classes.otherIcons}>
            <Tooltip title="Customize Colors">
              <IconButton
                component={Link}
                to={{
                  pathname: "/colors",
                  search: generateSearch(
                    {
                      from_type: "navbar",
                    },
                    null
                  ),
                }}
              >
                <Palette />
              </IconButton>
            </Tooltip>
            <Tooltip title={`Toggle ${isDarkMode ? "Light" : "Dark"} Mode`}>
              <IconButton
                onClick={() => {
                  dispatch(toggleDarkMode());
                  enqueueSnackbar(
                    `Toggled ${isDarkMode ? "Light" : "Dark"} Mode`,
                    {
                      variant: "success",
                      onUndo: () => {
                        dispatch(toggleDarkMode());
                      },
                    }
                  );
                }}
              >
                {isDarkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Settings">
              <IconButton
                component={Link}
                to={{
                  pathname: "/settings",
                  search: generateSearch(
                    {
                      from_type: "navbar",
                    },
                    null
                  ),
                }}
              >
                <Settings />
              </IconButton>
            </Tooltip>
          </div>
          {isSizeSmall && !isLTR && toggleSidebarButton}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Navbar;

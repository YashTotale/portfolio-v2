// React Imports
import React, { FC } from "react";
import { SIDEBAR_WIDTH } from "../../Utils/constants";

// Redux Imports
import { toggleDarkMode, toggleSidebar } from "../../Redux";
import { useAppDispatch } from "../../Store";

// Material UI Imports
import {
  makeStyles,
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import {
  Brightness7,
  Brightness4,
  Menu as MenuButton,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    [theme.breakpoints.up("lg")]: {
      marginLeft: SIDEBAR_WIDTH,
    },
  },
  rightIcons: {
    marginLeft: "auto",
  },
  avatar: {
    cursor: "pointer",
  },
}));

const Navbar: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const isSizeSmall = useMediaQuery(theme.breakpoints.down("md"));
  const isDarkMode = theme.palette.type === "dark";

  return (
    <AppBar elevation={2} color="transparent" position="static">
      <Toolbar className={classes.toolbar}>
        <div>
          {isSizeSmall && (
            <Tooltip title="Toggle Sidebar">
              <IconButton onClick={() => dispatch(toggleSidebar())}>
                <MenuButton />
              </IconButton>
            </Tooltip>
          )}
        </div>
        <div className={classes.rightIcons}>
          <Tooltip title={`Toggle ${isDarkMode ? "Light" : "Dark"} Mode`}>
            <IconButton
              onClick={() => {
                dispatch(toggleDarkMode());
              }}
            >
              {isDarkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

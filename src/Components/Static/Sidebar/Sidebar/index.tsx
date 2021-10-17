// React Imports
import React, { FC } from "react";
import Contents from "./Contents";
import { SIDEBAR_WIDTH } from "../../../../Utils/constants";

// Redux Imports
import { useSelector } from "react-redux";
import { getIsSidebarOpen, toggleSidebar } from "../../../../Redux";
import { useAppDispatch } from "../../../../Store";

// Material UI Imports
import {
  Drawer,
  SwipeableDrawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("lg")]: {
      width: SIDEBAR_WIDTH,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: SIDEBAR_WIDTH,
  },
}));

const Sidebar: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const isSidebarOpen = useSelector(getIsSidebarOpen);
  const isSmall = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <nav className={classes.drawer}>
      {isSmall ? (
        <SwipeableDrawer
          variant="temporary"
          anchor={theme.direction === "ltr" ? "left" : "right"}
          open={isSidebarOpen}
          onClose={() => dispatch(toggleSidebar(false))}
          onOpen={() => dispatch(toggleSidebar(true))}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Contents />
        </SwipeableDrawer>
      ) : (
        <Drawer
          variant="permanent"
          anchor={theme.direction === "ltr" ? "left" : "right"}
          open
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Contents />
        </Drawer>
      )}
    </nav>
  );
};

export default Sidebar;

// React Imports
import React, { FC } from "react";
import { SIDEBAR_WIDTH } from "../../../Utils/constants";

// Redux Imports
import { useSelector } from "react-redux";
import { getIsSidebarOpen, toggleSidebar } from "../../../Redux/display.slice";
import { useAppDispatch } from "../../../Store";

// Material UI Imports
import { makeStyles, Drawer, useTheme, useMediaQuery } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  skeleton: {
    width: "100%",
    height: "100%",
  },
  drawerPaper: {
    width: SIDEBAR_WIDTH,
    flexShrink: 0,
  },
}));

const Loading: FC = (props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const isSidebarOpen = useSelector(getIsSidebarOpen);

  const skeleton = <Skeleton variant="rect" className={classes.skeleton} />;

  return isSmall ? (
    <Drawer
      variant="temporary"
      anchor="left"
      open={isSidebarOpen}
      onClose={() => dispatch(toggleSidebar(false))}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      {skeleton}
    </Drawer>
  ) : (
    <Drawer
      variant="permanent"
      anchor="left"
      open
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      {skeleton}
    </Drawer>
  );
};

export default Loading;

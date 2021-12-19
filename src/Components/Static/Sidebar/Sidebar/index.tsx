// React Imports
import React, { FC } from "react";
import { useTour } from "@reactour/tour";
import Contents from "./Contents";
import { SIDEBAR_WIDTH } from "../../../../Utils/constants";

// Redux Imports
import { useSelector } from "react-redux";
import { getIsSidebarOpen, toggleSidebar } from "../../../../Redux";
import { DATA_TOUR, TourStep } from "../../../../Redux/tour.slice";
import { useAppDispatch } from "../../../../Store";

// Material UI Imports
import {
  Drawer,
  DrawerProps,
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
  const { isOpen: isTourOpen, currentStep } = useTour();

  const isSidebarOpen = useSelector(getIsSidebarOpen);
  const isSizeMedium = useMediaQuery(theme.breakpoints.down("lg"));

  const sharedProps: DrawerProps = {
    anchor: theme.direction === "ltr" ? "left" : "right",
    classes: {
      paper: classes.drawerPaper,
    },
    PaperProps: {
      //@ts-expect-error Data properties not in prop type
      [DATA_TOUR]: TourStep.SIDEBAR,
    },
  };

  return (
    <nav className={classes.drawer}>
      {isSizeMedium ? (
        <SwipeableDrawer
          {...sharedProps}
          keepMounted
          variant="temporary"
          open={
            isSidebarOpen || (isTourOpen && currentStep === TourStep.SIDEBAR)
          }
          onClose={() => dispatch(toggleSidebar(false))}
          onOpen={() => dispatch(toggleSidebar(true))}
        >
          <Contents />
        </SwipeableDrawer>
      ) : (
        <Drawer {...sharedProps} variant="permanent" open>
          <Contents />
        </Drawer>
      )}
    </nav>
  );
};

export default Sidebar;

// React Imports
import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTour } from "@reactour/tour";
import ScrollProgress from "./ScrollProgress";
import { Paths } from "../NavController";
import { useClosableSnackbar } from "../../../Hooks";
import { useDisplay } from "../../../Context/DisplayContext";
import { SIDEBAR_WIDTH } from "../../../Utils/constants";

// Redux Imports
import { useSelector } from "react-redux";
import { getTourSnackbarOpen, toggleSidebar } from "../../../Redux";
import { DATA_TOUR, TourStep } from "../../../Redux/tour.slice";
import { useAppDispatch } from "../../../Store";

// Material UI Imports
import {
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  useTheme,
  useMediaQuery,
  useScrollTrigger,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import {
  Brightness7,
  Brightness4,
  Menu as MenuButton,
  Palette,
  Settings,
  Home,
  Tour,
} from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    margin: 0,
    [theme.breakpoints.up("lg")]: {
      marginLeft: theme.direction === "ltr" ? SIDEBAR_WIDTH : 0,
      marginRight: theme.direction === "rtl" ? SIDEBAR_WIDTH : 0,
    },
  },
}));

const Navbar: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const isSizeMedium = useMediaQuery(theme.breakpoints.down("lg"));
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));
  const isLTR = theme.direction === "ltr";

  const toggleSidebarButton = (
    <div>
      <Tooltip title="Toggle Sidebar">
        <IconButton
          onClick={() => dispatch(toggleSidebar())}
          size={isSizeXS ? "medium" : "large"}
        >
          <MenuButton />
        </IconButton>
      </Tooltip>
    </div>
  );

  return (
    <>
      <AppBar elevation={trigger ? 4 : 1} color="default">
        <Toolbar className={classes.toolbar}>
          <ScrollProgress />
          {isSizeMedium && isLTR && toggleSidebarButton}
          <OtherIcons />
          {isSizeMedium && !isLTR && toggleSidebarButton}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

const useOtherIconStyles = makeStyles((theme) => ({
  otherIcons: {
    marginLeft: theme.direction === "ltr" ? "auto" : 0,
    marginRight: theme.direction === "rtl" ? "auto" : 0,
  },
  homeIcon: {
    fontSize: 28,
  },
}));

const OtherIcons: FC = () => {
  const classes = useOtherIconStyles();
  const theme = useTheme();
  const { changeDisplay } = useDisplay();
  const { pathname } = useLocation();
  const { enqueueSnackbar } = useClosableSnackbar();

  const {
    isOpen: isTourOpen,
    setIsOpen: setTourOpen,
    setCurrentStep,
    currentStep,
  } = useTour();
  const isTourSnackbarOpen = useSelector(getTourSnackbarOpen);
  const isTourBtnStep = currentStep === TourStep.TOUR_BTN;

  const isHome = pathname === Paths.Home;
  const isSizeMedium = useMediaQuery(theme.breakpoints.down("lg"));
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <div className={classes.otherIcons}>
      {isSizeMedium && !isHome && (
        <Tooltip title="Home">
          <IconButton
            component={Link}
            to={Paths.Home}
            size={isSizeXS ? "medium" : "large"}
          >
            <Home className={classes.homeIcon} />
          </IconButton>
        </Tooltip>
      )}
      {isHome && (!isTourOpen || isTourBtnStep) && !isTourSnackbarOpen && (
        <Tooltip title="Start Tour">
          <IconButton
            onClick={() => {
              if (isTourBtnStep) setCurrentStep(0);
              setTourOpen(true);
            }}
            size={isSizeXS ? "medium" : "large"}
            {...{
              [DATA_TOUR]: TourStep.TOUR_BTN,
            }}
          >
            <Tour />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title="Customize Colors">
        <IconButton
          component={Link}
          to={Paths.Colors}
          size={isSizeXS ? "medium" : "large"}
          {...{
            [DATA_TOUR]: TourStep.COLORS,
          }}
        >
          <Palette />
        </IconButton>
      </Tooltip>
      <Tooltip title={`Toggle ${isDarkMode ? "Light" : "Dark"} Mode`}>
        <IconButton
          onClick={() => {
            changeDisplay({ darkMode: !isDarkMode });
            enqueueSnackbar(`Toggled ${isDarkMode ? "Light" : "Dark"} Mode`, {
              variant: "success",
              onUndo: () => {
                changeDisplay({ darkMode: !isDarkMode });
              },
            });
          }}
          size={isSizeXS ? "medium" : "large"}
          {...{
            [DATA_TOUR]: TourStep.TOGGLE_DARK_MODE,
          }}
        >
          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Tooltip>
      <Tooltip title="Settings">
        <IconButton
          component={Link}
          to={Paths.Settings}
          size={isSizeXS ? "medium" : "large"}
          {...{
            [DATA_TOUR]: TourStep.SETTINGS,
          }}
        >
          <Settings />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default Navbar;

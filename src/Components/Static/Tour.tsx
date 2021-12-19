// React Imports
import React, { FC, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { StepType, TourProvider, useTour } from "@reactour/tour";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { Paths } from "./NavController";
import { SIDEBAR_WIDTH } from "../../Utils/constants";

// Redux Imports
import { useSelector } from "react-redux";
import { getTourSnackbarOpen, toggleTourSnackbarOpen } from "../../Redux";
import { DATA_TOUR, TourStep } from "../../Redux/tour.slice";
import { useAppDispatch } from "../../Store";

// Material UI Imports
import { Alert, Button, Snackbar, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const createSelector = (step: TourStep) => `[${DATA_TOUR}="${step}"]`;
const disableBody = (target: Element | null) =>
  target && disableBodyScroll(target);
const enableBody = (target: Element | null) =>
  target && enableBodyScroll(target);

const Tour: FC = ({ children }) => {
  const theme = useTheme();
  const steps: StepType[] = [
    {
      selector: createSelector(TourStep.TYPER),
      content: "Quick Navigation",
      resizeObservables: [createSelector(TourStep.TYPER)],
    },
    {
      selector: createSelector(TourStep.SIDEBAR),
      content: "Sidebar Navigation",
    },
  ];

  return (
    <TourProvider
      defaultOpen={false}
      steps={steps}
      showCloseButton={false}
      afterOpen={disableBody}
      beforeClose={enableBody}
      styles={{
        popover: (base) => ({
          ...base,
          backgroundColor: theme.palette.background.paper,
        }),
      }}
    >
      {children}
      <TourSnackbar />
    </TourProvider>
  );
};

const useSnackbarStyles = makeStyles((theme) => ({
  snackbar: {
    top: 24,
  },
  alert: {
    [theme.breakpoints.up("lg")]: {
      marginLeft: SIDEBAR_WIDTH,
    },
  },
  alertMessage: {
    padding: 0,
  },
  alertAction: {
    padding: 0,
    paddingLeft: 12,
    alignItems: "center",
  },
  alertButton: {
    textTransform: "none",
  },
}));

const TourSnackbar: FC = () => {
  const classes = useSnackbarStyles();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { pathname } = useLocation();

  const { isOpen: tourOpen, setIsOpen } = useTour();
  const snackbarOpen = useSelector(getTourSnackbarOpen);
  const isHome = pathname === Paths.Home;

  const closeSnackbar = useCallback(() => {
    dispatch(toggleTourSnackbarOpen(false));
  }, [dispatch]);

  const startTour = () => {
    setIsOpen(true);
    dispatch(toggleTourSnackbarOpen(false));
  };

  useEffect(() => {
    if (!isHome) {
      setIsOpen(false);
    }
  }, [isHome, setIsOpen]);

  useEffect(() => {
    if (tourOpen && snackbarOpen) {
      closeSnackbar();
    }
  }, [tourOpen, snackbarOpen, closeSnackbar]);

  return (
    <Snackbar
      open={snackbarOpen && isHome}
      color={theme.palette.primary.main}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      className={classes.snackbar}
    >
      <Alert
        severity="info"
        onClose={closeSnackbar}
        classes={{ message: classes.alertMessage, action: classes.alertAction }}
        className={classes.alert}
      >
        <Button
          color="inherit"
          className={classes.alertButton}
          onClick={startTour}
        >
          Start Tour!
        </Button>
      </Alert>
    </Snackbar>
  );
};

export default Tour;

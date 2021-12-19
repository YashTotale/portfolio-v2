// React Imports
import React, { FC, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { StepType, TourProvider, useTour } from "@reactour/tour";
import { ArrowProps } from "@reactour/tour/dist/components/Navigation";
import { ContentProps } from "@reactour/tour/dist/components/Content";
import { CloseProps } from "@reactour/tour/dist/components/Close";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { Paths } from "./NavController";
import { SIDEBAR_WIDTH } from "../../Utils/constants";

// Redux Imports
import { useSelector } from "react-redux";
import { getTourSnackbarOpen, toggleTourSnackbarOpen } from "../../Redux";
import { DATA_TOUR, TourStep } from "../../Redux/tour.slice";
import { useAppDispatch } from "../../Store";

// Material UI Imports
import {
  Alert,
  Button,
  darken,
  IconButton,
  Snackbar,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ArrowBack,
  ArrowForward,
  InfoOutlined,
  Close as CloseIcon,
} from "@mui/icons-material";
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
    {
      selector: createSelector(TourStep.COLORS),
      content: "Customize Colors",
    },
    {
      selector: createSelector(TourStep.TOGGLE_DARK_MODE),
      content: "Toggle Theme Type (Dark/Light)",
    },
    {
      selector: createSelector(TourStep.SETTINGS),
      content: "Settings (Account & Display)",
    },
    {
      selector: createSelector(TourStep.TOUR_BTN),
      content: "Restart Tour",
    },
  ];

  return (
    <TourProvider
      defaultOpen={false}
      steps={steps}
      afterOpen={disableBody}
      beforeClose={enableBody}
      rtl={theme.direction === "rtl"}
      components={{
        Content,
        Arrow,
        Close,
      }}
      styles={{
        popover: (base) => ({
          ...base,
          backgroundColor: theme.palette.background.paper,
        }),
        navigation: (base) => ({
          ...base,
          margin: theme.spacing(0, 1),
        }),
      }}
    >
      {children}
      <TourSnackbar />
    </TourProvider>
  );
};

const Content: FC<ContentProps> = ({ content }) => {
  return <Typography align="center">{content}</Typography>;
};

const useCloseStyles = makeStyles((theme) => ({
  button: {
    position: "absolute",
    top: "-0.8125em",
    right: "-0.8125em",
    backgroundColor: "#007aff",
    color: theme.palette.info.contrastText,

    "&:hover": {
      backgroundColor: darken("#007aff", 0.2),
    },
  },
}));

const Close: FC<CloseProps> = ({ disabled, onClick }) => {
  const classes = useCloseStyles();

  return (
    <IconButton
      disabled={disabled}
      onClick={onClick}
      size="small"
      className={classes.button}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );
};

const Arrow: FC<ArrowProps> = ({ disabled, inverted }) => {
  return (
    <IconButton disabled={disabled?.valueOf()}>
      {inverted ? <ArrowForward /> : <ArrowBack />}
    </IconButton>
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
    border: "1px solid",
  },
  alertIcon: {
    cursor: "pointer",
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
        icon={
          <InfoOutlined
            onClick={startTour}
            className={classes.alertIcon}
            fontSize="inherit"
          />
        }
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

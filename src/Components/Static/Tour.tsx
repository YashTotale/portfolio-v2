// React Imports
import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import { TourProvider } from "@reactour/tour";
import { Paths } from "./NavController";
import { SIDEBAR_WIDTH } from "../../Utils/constants";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getTourOpen,
  getTourSnackbarOpen,
  toggleTourOpen,
  toggleTourSnackbarOpen,
} from "../../Redux";

// Material UI Imports
import { Alert, Button, Snackbar, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useAppDispatch } from "../../Store";

const Tour: FC = ({ children }) => {
  const { pathname } = useLocation();
  const open = useSelector(getTourOpen);

  if (pathname !== Paths.Home) return <>{children}</>;

  return (
    <TourProvider defaultOpen={open} steps={[]}>
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

  const tourOpen = useSelector(getTourOpen);
  const snackbarOpen = useSelector(getTourSnackbarOpen);

  const onClose = () => dispatch(toggleTourSnackbarOpen(false));
  const onStart = () => {
    dispatch(toggleTourSnackbarOpen(false));
    dispatch(toggleTourOpen(true));
  };

  return (
    <Snackbar
      open={!tourOpen && snackbarOpen}
      color={theme.palette.primary.main}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      className={classes.snackbar}
    >
      <Alert
        severity="info"
        onClose={onClose}
        classes={{ message: classes.alertMessage, action: classes.alertAction }}
        className={classes.alert}
      >
        <Button
          color="inherit"
          className={classes.alertButton}
          onClick={onStart}
        >
          Start Tour!
        </Button>
      </Alert>
    </Snackbar>
  );
};

export default Tour;

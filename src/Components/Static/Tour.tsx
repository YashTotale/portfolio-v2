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
  toggleTourSnackbarOpen,
} from "../../Redux";

// Material UI Imports
import { Alert, Snackbar, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useAppDispatch } from "../../Store";

const Tour: FC = ({ children }) => {
  const { pathname } = useLocation();
  const open = useSelector(getTourOpen);

  if (pathname !== Paths.Home) return <>{children}</>;

  if (!open)
    return (
      <>
        {children}
        <TourSnackbar />
      </>
    );

  return <TourProvider steps={[]}>{children}</TourProvider>;
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
}));

const TourSnackbar: FC = () => {
  const classes = useSnackbarStyles();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const snackbarOpen = useSelector(getTourSnackbarOpen);

  const onClose = () => dispatch(toggleTourSnackbarOpen(false));

  return (
    <Snackbar
      open={snackbarOpen}
      color={theme.palette.primary.main}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      className={classes.snackbar}
    >
      <Alert severity="info" onClose={onClose} className={classes.alert}>
        Begin Tour!
      </Alert>
    </Snackbar>
  );
};

export default Tour;

// React Imports
import React, { FC, ReactElement } from "react";
import { useLocation } from "react-router-dom";
import { TourProvider } from "@reactour/tour";

// Material UI Imports
import makeStyles from "@mui/styles/makeStyles";
import { Paths } from "./NavController";

const useStyles = makeStyles((theme) => ({}));

interface TourProps {
  children: ReactElement<any, any>;
}

const Tour: FC<TourProps> = ({ children }) => {
  const classes = useStyles();
  const { pathname } = useLocation();

  if (pathname !== Paths.Home) return children;

  return <TourProvider steps={[]}>{children}</TourProvider>;
};

export default Tour;

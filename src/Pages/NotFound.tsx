// React Imports
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useAnalytics } from "../Hooks";
import { generatePageTitle } from "../Utils/funcs";
import { Paths } from "../Components/Static/NavController";

// Material UI Imports
import { Button, Typography, capitalize } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  notFound: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing(2),
    marginTop: "10vh",
  },
  heading: {
    fontFamily: "Cabin, 'sans-serif'",
    letterSpacing: 3,
    textTransform: "uppercase",
    fontSize: "2rem",
  },
  "404": {
    fontFamily: "Montserrat, 'sans-serif'",
    fontSize: "12rem",
    fontWeight: 900,
    letterSpacing: -40,
    [theme.breakpoints.only("xs")]: {
      fontSize: "10rem",
    },
  },
  subheading: {
    fontFamily: "Cabin, 'sans-serif'",
    fontSize: "2rem",
  },
  number: {
    textShadow: `-8px 0px 0px ${
      theme.palette.common[theme.palette.mode === "dark" ? "black" : "white"]
    }`,
  },
  link: {
    textDecoration: "none",
  },
  button: {
    margin: theme.spacing(2, 0),
  },
}));

interface NotFoundProps {
  name?: string;
  redirectName?: string;
  redirect?: string;
}

const NotFound: FC<NotFoundProps> = ({
  name = "page",
  redirectName = "Home Page",
  redirect = Paths.Home,
}) => {
  const classes = useStyles();

  const pageTitle = `404: ${capitalize(name)} Not Found`;
  useAnalytics(pageTitle);

  return (
    <>
      <Helmet>
        <title>{generatePageTitle(pageTitle)}</title>
      </Helmet>
      <div className={classes.notFound}>
        <Typography align="center" variant="h3" className={classes.heading}>
          Oops! {name} not found
        </Typography>
        <Typography align="center" variant="h1" className={classes["404"]}>
          <Number>4</Number>
          <Number>0</Number>
          <Number>4</Number>
        </Typography>
        <Typography variant="h2" align="center" className={classes.subheading}>
          The {name} you requested was not found
        </Typography>
        <Link to={redirect} className={classes.link}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Go to {redirectName}
          </Button>
        </Link>
      </div>
    </>
  );
};

const Number: FC = ({ children }) => {
  const classes = useStyles();
  return <span className={classes.number}>{children}</span>;
};

export default NotFound;

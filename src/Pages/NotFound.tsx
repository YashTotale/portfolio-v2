// React Imports
import React, { FC, useState } from "react";
import { Redirect } from "react-router-dom";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  notFound: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
  },
  subheading: {
    fontFamily: "Cabin, 'sans-serif'",
    fontSize: "3rem",
  },
  number: {
    textShadow: `-8px 0px 0px ${
      theme.palette.common[theme.palette.type === "dark" ? "black" : "white"]
    }`,
  },
  homeBtn: {
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
  redirect = "/",
}) => {
  const classes = useStyles();
  const [shouldRedirect, setRedirect] = useState<string | null>(null);

  if (shouldRedirect !== null) return <Redirect to={redirect} />;

  return (
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
      <Button
        variant="contained"
        color="primary"
        onClick={() => setRedirect(redirect)}
        className={classes.homeBtn}
      >
        Go to {redirectName}
      </Button>
    </div>
  );
};

const Number: FC = ({ children }) => {
  const classes = useStyles();
  return <span className={classes.number}>{children}</span>;
};

export default NotFound;

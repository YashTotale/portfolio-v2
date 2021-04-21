//React Imports
import { hot } from "react-hot-loader";
import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";

// Pages
import Home from "./Pages/Home";

// Components
import Popup from "./Components/Popup";
import Navbar from "./Components/Navbar";

// Material UI Imports
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  app: {},
}));

const App: FC = () => {
  return (
    <>
      <Popup />
      <Navbar />
      <Routes />
    </>
  );
};

const Routes: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
};

//Hot Loader reloads the app when you save changes
export default hot(module)(App);

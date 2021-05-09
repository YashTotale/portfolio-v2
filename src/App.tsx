//React Imports
import { hot } from "react-hot-loader";
import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";
import { DataProvider } from "./Context/DataContext";
import { SIDEBAR_WIDTH } from "./Utils/constants";

// Pages
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import ProjectsPage from "./Pages/Projects";
import ProjectPage from "./Pages/Project";
import TagsPage from "./Pages/Tags";

// Components
import Popup from "./Components/Popup";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";

// Material UI Imports
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  app: {
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up("lg")]: {
      marginLeft: SIDEBAR_WIDTH,
    },
  },
}));

const App: FC = () => {
  return (
    <DataProvider>
      <Popup />
      <Navbar />
      <Sidebar />
      <Routes />
    </DataProvider>
  );
};

const Routes: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <Switch>
        <Route exact path="/projects">
          <ProjectsPage />
        </Route>
        <Route exact path="/projects/:id">
          <ProjectPage />
        </Route>
        <Route exact path="/tags">
          <TagsPage />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};

//Hot Loader reloads the app when you save changes
export default hot(module)(App);

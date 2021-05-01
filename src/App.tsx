//React Imports
import { hot } from "react-hot-loader";
import React, { FC, useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Projects } from "./Utils/types";

// Pages
import Home from "./Pages/Home";
import ProjectsPage from "./Pages/Projects";

// Components
import Popup from "./Components/Popup";
import Navbar from "./Components/Navbar";

// API Imports
import { getProjects } from "./API/projects";

// Material UI Imports
import { makeStyles } from "@material-ui/core";
import { ProjectsProvider } from "./Context/ProjectsContext";

const useStyles = makeStyles((theme) => ({
  app: {},
}));

const App: FC = () => {
  const [projects, setProjects] = useState<Projects | null>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const projects = await getProjects();

      if (isMounted) {
        setProjects(projects);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ProjectsProvider value={projects}>
      <Popup />
      <Navbar />
      <Routes />
    </ProjectsProvider>
  );
};

const Routes: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <Switch>
        <Route path="/projects">
          <ProjectsPage />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
};

//Hot Loader reloads the app when you save changes
export default hot(module)(App);

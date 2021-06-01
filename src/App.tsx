//React Imports
import { hot } from "react-hot-loader";
import React, { FC, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { DataProvider } from "./Context/DataContext";
import { SIDEBAR_WIDTH } from "./Utils/constants";

// Components
import Popup from "./Components/Popup";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import ScrollToTop from "./Components/ScrollToTop";

// Material UI Imports
import { CircularProgress, makeStyles } from "@material-ui/core";

// Pages
const Home = lazy(() => import("./Pages/Home"));
const ExperiencePage = lazy(() => import("./Pages/Experience"));
const ProjectsPage = lazy(() => import("./Pages/Projects"));
const ProjectPage = lazy(() => import("./Pages/Project"));
const TagsPage = lazy(() => import("./Pages/Tags"));
const TagPage = lazy(() => import("./Pages/Tag"));
const Contact = lazy(() => import("./Pages/Contact"));
const NotFound = lazy(() => import("./Pages/NotFound"));

const useStyles = makeStyles((theme) => ({
  app: {
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up("lg")]: {
      marginLeft: SIDEBAR_WIDTH,
    },
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));

const App: FC = () => {
  return (
    <DataProvider>
      <ScrollToTop />
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
      <Suspense
        fallback={
          <div className={classes.spinner}>
            <CircularProgress />
          </div>
        }
      >
        <Switch>
          <Route exact path={["/experience", "/experience/:id"]}>
            <ExperiencePage />
          </Route>
          <Route exact path="/projects">
            <ProjectsPage />
          </Route>
          <Route exact path="/projects/:id">
            <ProjectPage />
          </Route>
          <Route exact path="/tags">
            <TagsPage />
          </Route>
          <Route exact path="/tags/:id">
            <TagPage />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
};

//Hot Loader reloads the app when you save changes
export default hot(module)(App);

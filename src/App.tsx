//React Imports
import { hot } from "react-hot-loader";
import React, { FC, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
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
const SingleExperiencePage = lazy(() => import("./Pages/SingleExperience"));
const ProjectsPage = lazy(() => import("./Pages/Projects"));
const ProjectPage = lazy(() => import("./Pages/Project"));
const ArticlesPage = lazy(() => import("./Pages/Articles"));
const ArticlePage = lazy(() => import("./Pages/Article"));
const TagsPage = lazy(() => import("./Pages/Tags"));
const TagPage = lazy(() => import("./Pages/Tag"));
const Contact = lazy(() => import("./Pages/Contact"));
const BooksPage = lazy(() => import("./Pages/Books"));
const NotFound = lazy(() => import("./Pages/NotFound"));

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up("lg")]: {
      marginLeft: SIDEBAR_WIDTH,
    },
  },
  layout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "stretch",
    width: "90%",
    margin: "auto",
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));

const App: FC = () => {
  return (
    <>
      <ScrollToTop />
      <Popup />
      <Navbar />
      <Sidebar />
      <Routes />
    </>
  );
};

const Routes: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.layout}>
        <Suspense
          fallback={
            <div className={classes.spinner}>
              <CircularProgress />
            </div>
          }
        >
          <Switch>
            <Route exact path="/experience">
              <ExperiencePage />
            </Route>
            <Route exact path="/experience/:slug">
              <SingleExperiencePage />
            </Route>
            <Route exact path="/projects">
              <ProjectsPage />
            </Route>
            <Route exact path="/projects/:slug">
              <ProjectPage />
            </Route>
            <Route exact path="/articles">
              <ArticlesPage />
            </Route>
            <Route exact path="/articles/:slug">
              <ArticlePage />
            </Route>
            <Route exact path="/tags">
              <TagsPage />
            </Route>
            <Route exact path="/tags/:slug">
              <TagPage />
            </Route>
            <Route exact path="/books">
              <BooksPage />
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
    </div>
  );
};

//Hot Loader reloads the app when you save changes
export default hot(module)(App);

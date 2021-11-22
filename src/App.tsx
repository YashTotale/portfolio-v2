//React Imports
import { hot } from "react-hot-loader";
import React, { FC, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { SIDEBAR_WIDTH } from "./Utils/constants";

// Context
import { UserProvider } from "./Context/UserContext";
import { HeadProvider } from "./Context/HeadContext";
import { DisplayProvider } from "./Context/DisplayContext";

// Components
import Navbar from "./Components/Static/Navbar";
import Footer from "./Components/Static/Footer";
import Popup from "./Components/Static/Popup";
import Sidebar from "./Components/Static/Sidebar";
import NavController, { Paths } from "./Components/Static/NavController";
import Loading from "./Components/Static/Loading";

// Firebase Imports
import FirebaseProvider from "./Firebase";

// Material UI Imports
import { SnackbarProvider } from "notistack";
import Theme from "./Theme";
import makeStyles from "@mui/styles/makeStyles";

// Pages
const Home = lazy(() => import("./Pages/Home"));
const ExperiencePage = lazy(() => import("./Pages/Experience"));
const SingleExperiencePage = lazy(() => import("./Pages/SingleExperience"));
const EducationPage = lazy(() => import("./Pages/Education"));
const SingleEducationPage = lazy(() => import("./Pages/SingleEducation"));
const ProjectsPage = lazy(() => import("./Pages/Projects"));
const ProjectPage = lazy(() => import("./Pages/Project"));
const ArticlesPage = lazy(() => import("./Pages/Articles"));
const ArticlePage = lazy(() => import("./Pages/Article"));
const TagsPage = lazy(() => import("./Pages/Tags"));
const TagPage = lazy(() => import("./Pages/Tag"));
const CertificationPage = lazy(() => import("./Pages/Certification"));
const BooksPage = lazy(() => import("./Pages/Books"));
const Contact = lazy(() => import("./Pages/Contact"));
const Colors = lazy(() => import("./Pages/Colors"));
const Settings = lazy(() => import("./Pages/Settings"));
const NotFound = lazy(() => import("./Pages/NotFound"));

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up("lg")]: {
      marginLeft: theme.direction === "ltr" ? SIDEBAR_WIDTH : 0,
      marginRight: theme.direction === "rtl" ? SIDEBAR_WIDTH : 0,
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
}));

const App: FC = () => {
  return (
    <HeadProvider>
      <FirebaseProvider>
        <UserProvider>
          <DisplayProvider>
            <Theme>
              <SnackbarProvider>
                <NavController />
                <Navbar />
                <Popup />
                <Sidebar />
                <Routes />
              </SnackbarProvider>
            </Theme>
          </DisplayProvider>
        </UserProvider>
      </FirebaseProvider>
    </HeadProvider>
  );
};

const Routes: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.layout}>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path={Paths.Experience}>
              <ExperiencePage />
            </Route>
            <Route exact path={Paths.SingleExperience()}>
              <SingleExperiencePage />
            </Route>
            <Route exact path={Paths.Education}>
              <EducationPage />
            </Route>
            <Route exact path={Paths.SingleEducation()}>
              <SingleEducationPage />
            </Route>
            <Route exact path={Paths.Projects}>
              <ProjectsPage />
            </Route>
            <Route exact path={Paths.Project()}>
              <ProjectPage />
            </Route>
            <Route exact path={Paths.Articles}>
              <ArticlesPage />
            </Route>
            <Route exact path={Paths.Article()}>
              <ArticlePage />
            </Route>
            <Route exact path={Paths.Tags}>
              <TagsPage />
            </Route>
            <Route exact path={Paths.Tag()}>
              <TagPage />
            </Route>
            <Route exact path={Paths.Certifications}>
              <CertificationPage />
            </Route>
            <Route exact path={Paths.Books}>
              <BooksPage />
            </Route>
            <Route exact path={Paths.Contact}>
              <Contact />
            </Route>
            <Route exact path={Paths.Colors}>
              <Colors />
            </Route>
            <Route exact path={Paths.Settings}>
              <Settings />
            </Route>
            <Route exact path={Paths.Home}>
              <Home />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
        <Footer />
      </div>
    </div>
  );
};

//Hot Loader reloads the app when you save changes
export default hot(module)(App);

// React Imports
import React, { FC, useState, useEffect } from "react";
import { Redirect, useLocation } from "react-router";
import { useTitle } from "../../Context/HeadContext";
import { scrollToTop } from "../../Utils/funcs";

// Redux Imports
import { addToHistory, modifyLastHistory } from "../../Redux";
import { useAppDispatch } from "../../Store";

// Material UI Imports
import { Fab, useScrollTrigger, Zoom } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { KeyboardArrowUp } from "@mui/icons-material";

export const Paths = {
  Home: "/",
  Experience: "/experience",
  SingleExperience: (slug?: string): string => `/experience/${slug ?? ":slug"}`,
  Education: "/education",
  SingleEducation: (slug?: string): string => `/education/${slug ?? ":slug"}`,
  Projects: "/projects",
  Project: (slug?: string): string => `/projects/${slug ?? ":slug"}`,
  Articles: "/articles",
  Article: (slug?: string): string => `/articles/${slug ?? ":slug"}`,
  Tags: "/tags",
  Tag: (slug?: string): string => `/tags/${slug ?? ":slug"}`,
  Certifications: "/certifications",
  Books: "/books",
  Contact: "/contact",
  Colors: "/colors",
  Settings: "/settings",
};

const NavController: FC = () => {
  const dispatch = useAppDispatch();
  const [prevPath, setPrevPath] = useState<string | null>(null);

  const location = useLocation();
  const pathname = location.pathname;
  const title = useTitle();

  const withTrailingSlash = pathname.charAt(pathname.length - 1) === "/";
  const normalizedPath = withTrailingSlash ? pathname.slice(0, -1) : pathname;

  useEffect(() => {
    if (normalizedPath === prevPath) {
      dispatch(
        modifyLastHistory({
          pathname: normalizedPath,
          title,
        })
      );
    } else {
      dispatch(addToHistory({ pathname: normalizedPath, title }));
      setPrevPath(normalizedPath);
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [normalizedPath, title, dispatch]);

  if (withTrailingSlash)
    return (
      <>
        <Redirect to={{ ...location, pathname: pathname.slice(0, -1) }} />
        <ScrollToTop />
      </>
    );

  return <ScrollToTop />;
};

const useScrollToTopStyles = makeStyles((theme) => ({
  scrollToTop: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1000,
  },
}));

const ScrollToTop: FC = () => {
  const classes = useScrollToTopStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const onClick = () => scrollToTop();

  return (
    <Zoom in={trigger}>
      <div className={classes.scrollToTop} onClick={onClick}>
        <Fab color="secondary" size="small" title="Scroll to Top">
          <KeyboardArrowUp />
        </Fab>
      </div>
    </Zoom>
  );
};

export default NavController;

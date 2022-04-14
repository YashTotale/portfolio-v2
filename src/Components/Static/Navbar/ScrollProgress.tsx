// React Imports
import React, { FC, useCallback, useEffect, useState } from "react";

// Material UI Imports
import { lighten, Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { SIDEBAR_WIDTH } from "../../../Utils/constants";
import { useDisplay } from "../../../Context/DisplayContext";

interface StyleProps {
  width: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  progressContainer: {
    background: lighten(theme.palette.secondary.main, 0.8),
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
    height: "5px",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    zIndex: 99,

    [theme.breakpoints.up("lg")]: {
      left: SIDEBAR_WIDTH,
      width: `calc(100vw - ${SIDEBAR_WIDTH}px)`,
    },
  },
  progressBar: {
    height: "5px",
    background: theme.palette.secondary.main,
    width: ({ width }) => width,
  },
}));

const ScrollProgress: FC = () => {
  const [scrolled, setScrolled] = useState(0);
  const { display } = useDisplay();
  const classes = useStyles({
    width: `${scrolled}%`,
  });

  const scrollProgress = useCallback(() => {
    if (!display.enableScrollProgressBar) return;

    const scrollPx = document.documentElement.scrollTop;
    const winHeightPx =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (scrollPx / winHeightPx) * 100;
    setScrolled(scrolled);
  }, [display.enableScrollProgressBar]);

  useEffect(() => {
    scrollProgress();
  }, [scrollProgress, display.enableScrollProgressBar]);

  useEffect(() => {
    window.addEventListener("scroll", scrollProgress);

    return () => {
      window.removeEventListener("scroll", scrollProgress);
    };
  }, [scrollProgress]);

  if (!display.enableScrollProgressBar) return null;

  return (
    <div className={classes.progressContainer}>
      <div className={classes.progressBar} />
    </div>
  );
};

export default ScrollProgress;

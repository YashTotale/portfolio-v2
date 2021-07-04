// React Imports
import React, { FC, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Document } from "@contentful/rich-text-types";
import Typist from "react-typist";
import { Helmet } from "react-helmet";
import { useAnalytics } from "../../Hooks";
import RichText from "../../Components/RichText";
import StyledLink from "../../Components/StyledLink";
import DynamicImage from "../../Components/DynamicImage";
import { useTitle } from "../../Context/HeadContext";
import { generatePageTitle, generateSearch } from "../../Utils/funcs";
import { getDescription } from "../../Utils/Content/main";
import "react-typist/dist/Typist.css";

// Material UI Imports
import {
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  home: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    width: "100%",
  },
  logo: {
    margin: theme.spacing(2, 0),
  },
  heading: {
    lineHeight: 1,
    marginBottom: theme.spacing(1),
  },
  typer: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "1.55rem",
    },
  },
  description: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
}));

const Home: FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const description = getDescription();

  useAnalytics("Home");

  return (
    <>
      <Helmet>
        <title>{generatePageTitle("Home")}</title>
      </Helmet>
      <div className={classes.home}>
        <DynamicImage
          src={isSizeSmall ? "/logo192.png" : "/logo512.png"}
          alt="Website Logo"
          height={isSizeSmall ? 75 : 100}
          className={classes.logo}
        />
        <Typography
          align="center"
          variant={isSizeSmall ? "h2" : "h1"}
          className={classes.heading}
        >
          Yash Totale
        </Typography>
        <Typography
          variant={isSizeSmall ? "h4" : "h3"}
          align="center"
          className={classes.typer}
        >
          Check out my <Typer />
        </Typography>
        <div className={classes.description}>
          <RichText
            richText={description as Document}
            variant={isSizeSmall ? "body2" : "body1"}
          />
        </div>
      </div>
    </>
  );
};

const useTyperStyles = makeStyles((theme) => ({
  typist: {
    display: "inline-block",
  },
}));

const Typer: FC = () => {
  const classes = useTyperStyles();
  const [count, setCount] = useState(1);

  const location = useLocation();
  const title = useTitle();

  useEffect(() => {
    setCount(1);
  }, [count]);

  const generateTo = (path: string) => ({
    pathname: path,
    search: generateSearch(
      {
        from_path: location.pathname,
        from_type: "home_typer",
      },
      title
    ),
  });

  return count ? (
    <Typist
      className={classes.typist}
      avgTypingDelay={50}
      onTypingDone={() => setCount(0)}
      cursor={{
        blink: true,
      }}
    >
      <StyledLink to={generateTo("/experience")}>experience</StyledLink>
      <Typist.Backspace count={"experience".length} delay={2000} />
      <StyledLink to={generateTo("/projects")}>projects</StyledLink>
      <Typist.Backspace count={"projects".length} delay={2000} />
      <StyledLink to={generateTo("/articles")}>articles</StyledLink>
      <Typist.Backspace count={"articles".length} delay={2000} />
      <StyledLink to={generateTo("/books")}>books</StyledLink>
      <Typist.Backspace count={"books".length} delay={2000} />
    </Typist>
  ) : null;
};

export default Home;

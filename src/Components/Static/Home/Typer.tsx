// React Imports
import React, { FC, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Typist from "react-typist";
import StyledLink from "../../Atomic/StyledLink";
import { useTitle } from "../../../Context/HeadContext";
import { generateSearch } from "../../../Utils/funcs";
import "react-typist/dist/Typist.css";

// Material UI Imports
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  typist: {
    display: "inline-block",
  },
}));

const Typer: FC = () => {
  const classes = useStyles();
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

      <StyledLink to={generateTo("/education")}>education</StyledLink>
      <Typist.Backspace count={"education".length} delay={2000} />

      <StyledLink to={generateTo("/projects")}>projects</StyledLink>
      <Typist.Backspace count={"projects".length} delay={2000} />

      <StyledLink to={generateTo("/articles")}>articles</StyledLink>
      <Typist.Backspace count={"articles".length} delay={2000} />

      <StyledLink to={generateTo("/books")}>books</StyledLink>
      <Typist.Backspace count={"books".length} delay={2000} />
    </Typist>
  ) : null;
};

export default Typer;

// React Imports
import React, { FC, useState, useEffect } from "react";
import Typist from "react-typist";
import StyledLink from "../../Atomic/StyledLink";
import "react-typist/dist/Typist.css";

// Material UI Imports
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  typist: {
    display: "inline-block",
  },
}));

const Typer: FC = () => {
  const classes = useStyles();
  const [count, setCount] = useState(1);

  useEffect(() => {
    setCount(1);
  }, [count]);

  return count ? (
    <Typist
      className={classes.typist}
      avgTypingDelay={50}
      onTypingDone={() => setCount(0)}
      cursor={{
        blink: true,
      }}
    >
      <StyledLink to="/experience">experience</StyledLink>
      <Typist.Backspace count={"experience".length} delay={2000} />

      <StyledLink to="/education">education</StyledLink>
      <Typist.Backspace count={"education".length} delay={2000} />

      <StyledLink to="/projects">projects</StyledLink>
      <Typist.Backspace count={"projects".length} delay={2000} />

      <StyledLink to="/articles">articles</StyledLink>
      <Typist.Backspace count={"articles".length} delay={2000} />

      <StyledLink to="/certifications">certifications</StyledLink>
      <Typist.Backspace count={"certifications".length} delay={2000} />

      <StyledLink to="/books">books</StyledLink>
      <Typist.Backspace count={"books".length} delay={2000} />
    </Typist>
  ) : (
    <></>
  );
};

export default Typer;

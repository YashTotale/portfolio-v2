// React Imports
import React, { FC, useState, useEffect } from "react";
import { Document } from "@contentful/rich-text-types";
import Typist from "react-typist";
import RichText from "../../Components/RichText";

// Data Imports
import main from "../../Data/main.json";

// Material UI Imports
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  home: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    margin: "auto",
  },
}));

const Home: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.home}>
      <Typography variant="h1">Yash Totale</Typography>
      <Typer />
      <RichText richText={main.description as Document} variant="body1" />
    </div>
  );
};

const useTyperStyles = makeStyles((theme) => ({
  typist: {
    display: "inline-block",
  },
}));

const Typer: FC = () => {
  const PREFIX = "Check out my ";
  const classes = useTyperStyles();
  const [count, setCount] = useState(1);

  useEffect(() => {
    setCount(1);
  }, [count]);

  return (
    <Typography variant="h3">
      {count ? (
        <>
          {PREFIX}
          <Typist
            className={classes.typist}
            avgTypingDelay={50}
            onTypingDone={() => setCount(0)}
            cursor={{
              blink: true,
            }}
          >
            <span>projects</span>
            <Typist.Backspace count={"projects".length} delay={2000} />
            <span>experience</span>
            <Typist.Backspace count={"experience".length} delay={2000} />
            <span>articles</span>
            <Typist.Backspace count={"articles".length} delay={2000} />
          </Typist>
        </>
      ) : (
        PREFIX
      )}
    </Typography>
  );
};

export default Home;

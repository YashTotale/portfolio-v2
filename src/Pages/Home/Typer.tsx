//React Imports
import React, { FC, useEffect, useState } from "react";
import Typist from "react-typist";

//Material UI Imports
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  typist: {
    display: "inline-block",
  },
}));

const Typer: FC = () => {
  const PREFIX = "Check out my ";
  const classes = useStyles();
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

export default Typer;

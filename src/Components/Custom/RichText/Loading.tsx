// React Imports
import React, { FC } from "react";

// Material UI Imports
import { makeStyles, Theme, TypographyProps } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

interface StyleProps {
  variant?: TypographyProps["variant"];
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  skeleton: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  text: {
    width: "100%",
    height: ({ variant }) => {
      switch (variant) {
        case "body1": {
          return 35;
        }
        default: {
          return 25;
        }
      }
    },
  },
}));

interface LoadingProps {
  variant?: TypographyProps["variant"];
}

const Loading: FC<LoadingProps> = (props) => {
  const classes = useStyles({
    variant: props.variant,
  });

  return (
    <div className={classes.skeleton}>
      {[...new Array(5)].map((_, i) => (
        <Skeleton key={i} variant="text" className={classes.text} />
      ))}
    </div>
  );
};

export default Loading;

// React Imports
import React, { forwardRef } from "react";
import clsx from "clsx";

// Material UI Imports
import { Paper, PaperProps, Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

interface StyleProps {
  elevation: number;
  elevationOnHover: number;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  paper: {
    boxShadow: ({ elevation }) => theme.shadows[elevation],
    transition: theme.transitions.create(["transform", "box-shadow"], {
      duration: "0.4s",
    }),
    "&:hover": {
      boxShadow: ({ elevationOnHover }) => theme.shadows[elevationOnHover],
      transform: `scale(1.01) translate(0, -${theme.spacing(0.5)})`,
    },
  },
}));

type DynamicPaperProps = PaperProps & {
  elevationOnHover?: PaperProps["elevation"];
};

const DynamicPaper = forwardRef<HTMLDivElement, DynamicPaperProps>(
  (props, ref) => {
    const { elevation = 8, elevationOnHover = 16 } = props;
    const classes = useStyles({ elevation, elevationOnHover });

    return (
      <Paper
        ref={ref}
        {...props}
        className={clsx(classes.paper, props.className)}
      />
    );
  }
);

export default DynamicPaper;

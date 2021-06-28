// React Imports
import React, { forwardRef, useState } from "react";
import clsx from "clsx";

// Material UI Imports
import { makeStyles, Paper, PaperProps, Theme } from "@material-ui/core";

interface StyleProps {
  hovering: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  paper: {
    transition: theme.transitions.create(["transform", "box-shadow"], {
      duration: "0.4s",
    }),
    transform: ({ hovering }) => (hovering ? "scale(1.01)" : ""),
  },
}));

type DynamicPaperProps = PaperProps & {
  elevationOnHover?: PaperProps["elevation"];
};

const DynamicPaper = forwardRef<HTMLDivElement, DynamicPaperProps>(
  (props, ref) => {
    const { elevation = 8, elevationOnHover = 16 } = props;
    const [hovering, setHovering] = useState(false);
    const classes = useStyles({ hovering });

    return (
      <Paper
        onMouseOver={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        elevation={hovering ? elevationOnHover : elevation}
        ref={ref}
        {...props}
        className={clsx(classes.paper, props.className)}
      />
    );
  }
);

export default DynamicPaper;

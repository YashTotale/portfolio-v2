// React Imports
import React, { forwardRef, useState } from "react";

// Material UI Imports
import { Paper, PaperProps } from "@material-ui/core";

type DynamicPaperProps = {
  elevationOnHover?: PaperProps["elevation"];
} & PaperProps;

const DynamicPaper = forwardRef<HTMLDivElement, DynamicPaperProps>(
  (props, ref) => {
    const { elevation = 8, elevationOnHover = 16 } = props;
    const [hovering, setHovering] = useState(false);

    return (
      <Paper
        onMouseOver={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        elevation={hovering ? elevationOnHover : elevation}
        ref={ref}
        {...props}
      />
    );
  }
);

export default DynamicPaper;

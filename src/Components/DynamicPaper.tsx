// React Imports
import React, { forwardRef, ReactNode, useState } from "react";
import clsx from "clsx";

// Material UI Imports
import { Paper, PaperProps } from "@material-ui/core";

interface DynamicPaperProps {
  children?: ReactNode;
  elevation?: PaperProps["elevation"];
  elevationOnHover?: PaperProps["elevation"];
  className?: string;
}

const DynamicPaper = forwardRef<HTMLDivElement, DynamicPaperProps>(
  (props, ref) => {
    const { children, elevation = 8, elevationOnHover = 16, className } = props;
    const [hovering, setHovering] = useState(false);

    return (
      <Paper
        onMouseOver={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        elevation={hovering ? elevationOnHover : elevation}
        className={clsx(className)}
        ref={ref}
      >
        {children}
      </Paper>
    );
  }
);

export default DynamicPaper;

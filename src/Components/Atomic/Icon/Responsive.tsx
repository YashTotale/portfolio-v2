// React Imports
import React, { cloneElement, forwardRef } from "react";

// Material UI Imports
import {
  IconButton,
  IconButtonProps,
  useMediaQuery,
  useTheme,
} from "@mui/material";

type ResponsiveIconProps = Omit<IconButtonProps, "children"> & {
  children: JSX.Element;
};

const ResponsiveIcon = forwardRef<any, ResponsiveIconProps>((props, ref) => {
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  const child = cloneElement(props.children, {
    fontSize: isSizeXS ? "small" : "default",
  });

  return (
    <IconButton {...props} ref={ref} size={isSizeXS ? "small" : "medium"}>
      {child}
    </IconButton>
  );
});

export default ResponsiveIcon;

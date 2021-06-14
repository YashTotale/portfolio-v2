// React Imports
import React, { FC } from "react";
import ResponsiveIcon from "./Responsive";

// Material UI Imports
import { IconButton, Tooltip } from "@material-ui/core";

interface LinkIconProps {
  label: string;
  href: string;
  icon: JSX.Element;
  withResize?: boolean;
  className?: string;
}

const LinkIcon: FC<LinkIconProps> = ({
  label,
  href,
  icon,
  withResize = true,
  className,
}) => {
  const props = {
    component: "a",
    target: "_blank",
    rel: "noopener noreferrer",
    children: icon,
    href,
    className,
  };

  return (
    <Tooltip title={label}>
      {withResize ? <ResponsiveIcon {...props} /> : <IconButton {...props} />}
    </Tooltip>
  );
};

export default LinkIcon;

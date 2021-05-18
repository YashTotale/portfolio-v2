// React Imports
import React, { cloneElement, FC } from "react";

// Material UI Imports
import {
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

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
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <Tooltip title={label}>
      <IconButton
        component="a"
        target="_blank"
        rel="noopener noreferrer"
        href={href}
        className={className}
        size={isSizeXS && withResize ? "small" : "medium"}
      >
        {cloneElement(icon, {
          fontSize: isSizeXS && withResize ? "small" : "default",
        })}
      </IconButton>
    </Tooltip>
  );
};

export default LinkIcon;

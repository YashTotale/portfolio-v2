// React Imports
import React, { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { LocationDescriptor } from "history";
import MatchHighlight from "./MatchHighlight";

// Material UI Imports
import { Link, LinkProps } from "@material-ui/core";

interface StyledLinkProps {
  to: LocationDescriptor;
  onClick?: LinkProps["onClick"];
  variant?: LinkProps["variant"];
  color?: LinkProps["color"];
  align?: LinkProps["align"];
  toMatch?: string;
  className?: string;
}

const StyledLink: FC<StyledLinkProps> = (props) => {
  const {
    to,
    children,
    onClick,
    variant,
    color = "primary",
    align,
    toMatch = "",
    className,
  } = props;

  return (
    <Link
      component={RouterLink}
      to={to}
      className={className}
      color={color}
      variant={variant}
      align={align}
      onClick={onClick}
    >
      {typeof children === "string" ? (
        <MatchHighlight toMatch={toMatch}>{children}</MatchHighlight>
      ) : (
        children
      )}
    </Link>
  );
};

export default StyledLink;

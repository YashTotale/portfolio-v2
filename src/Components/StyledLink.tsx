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
  align?: LinkProps["align"];
  toMatch?: string;
  className?: string;
}

const StyledLink: FC<StyledLinkProps> = ({
  to,
  children,
  onClick,
  variant,
  align,
  toMatch = "",
  className,
}) => {
  return (
    <Link
      component={RouterLink}
      to={to}
      className={className}
      color="primary"
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

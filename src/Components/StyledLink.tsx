// React Imports
import React, { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { LocationDescriptor } from "history";
import MatchHighlight from "./MatchHighlight";

// Material UI Imports
import { Link, LinkProps } from "@material-ui/core";

interface StyledLinkProps {
  to: LocationDescriptor;
  children: string;
  variant?: LinkProps["variant"];
  align?: LinkProps["align"];
  toMatch?: string;
  className?: string;
}

const StyledLink: FC<StyledLinkProps> = ({
  to,
  children,
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
    >
      <MatchHighlight toMatch={toMatch}>{children}</MatchHighlight>
    </Link>
  );
};

export default StyledLink;

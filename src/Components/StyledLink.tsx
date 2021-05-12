// React Imports
import React, { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { LocationDescriptor } from "history";
import MatchHighlight from "./MatchHighlight";

// Material UI Imports
import { Link, TypographyProps } from "@material-ui/core";

interface StyledLinkProps {
  to: LocationDescriptor;
  children: string;
  variant: TypographyProps["variant"];
  toMatch?: string;
  linkClassName?: string;
  titleClassName?: string;
}

const StyledLink: FC<StyledLinkProps> = ({
  to,
  children,
  variant,
  toMatch = "",
  linkClassName,
  titleClassName,
}) => {
  return (
    <Link
      component={RouterLink}
      to={to}
      className={linkClassName}
      color="primary"
      variant={variant}
    >
      <MatchHighlight toMatch={toMatch}>{children}</MatchHighlight>
    </Link>
  );
};

export default StyledLink;

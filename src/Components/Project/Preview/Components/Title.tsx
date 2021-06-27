//React Imports
import React, { FC } from "react";
import StyledLink from "../../../StyledLink";
import { ResolvedProject } from "../../../../Utils/types";

// Material UI Imports
import { makeStyles, useMediaQuery, useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  projectTitle: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "center",
    marginBottom: theme.spacing(1),
    width: "95%",
  },
}));

type TitleProps = ResolvedProject & {
  search?: string;
};

const Title: FC<TitleProps> = (props) => {
  const { slug, title, search } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <StyledLink
      to={`/projects/${slug}`}
      variant={isSizeXS ? "h5" : "h4"}
      className={classes.projectTitle}
      toMatch={search}
    >
      {title}
    </StyledLink>
  );
};

export default Title;

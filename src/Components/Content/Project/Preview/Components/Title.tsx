//React Imports
import React, { FC } from "react";
import StyledLink from "../../../../Atomic/StyledLink";
import { ResolvedProject } from "../../../../../Utils/types";

// Material UI Imports
import { useMediaQuery, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

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
  const { title, search } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <StyledLink
      to={`/projects/${props.slug}`}
      variant={isSizeXS ? "h5" : "h4"}
      className={classes.projectTitle}
      toMatch={search}
      withTitle
    >
      {title}
    </StyledLink>
  );
};

export default Title;

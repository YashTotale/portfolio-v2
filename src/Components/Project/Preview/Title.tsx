//React Imports
import React, { FC } from "react";
import StyledLink from "../../StyledLink";

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

interface TitleProps {
  id: string;
  title: string;
  search?: string;
}

const Title: FC<TitleProps> = (props) => {
  const { id, title } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <StyledLink
      to={`/projects/${id}`}
      variant={isSizeXS ? "h5" : "h4"}
      className={classes.projectTitle}
      toMatch={props.search}
    >
      {title}
    </StyledLink>
  );
};

export default Title;

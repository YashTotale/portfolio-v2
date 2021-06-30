//React Imports
import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import StyledLink from "../../../../StyledLink";
import { ResolvedProject } from "../../../../../Utils/types";
import { generateSearch } from "../../../../../Utils/funcs";

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
  const location = useLocation();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <StyledLink
      to={{
        pathname: `/projects/${slug}`,
        search: generateSearch({
          from_path: location.pathname,
          from_type: "preview_title",
        }),
      }}
      variant={isSizeXS ? "h5" : "h4"}
      className={classes.projectTitle}
      toMatch={search}
    >
      {title}
    </StyledLink>
  );
};

export default Title;

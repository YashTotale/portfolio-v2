//React Imports
import React, { FC } from "react";
import { Paths } from "../../../../Static/NavController";
import StyledLink from "../../../../Atomic/StyledLink";
import { ResolvedArticle } from "../../../../../Utils/types";

// Material UI Imports
import { useMediaQuery, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  articleTitle: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "center",
    marginBottom: theme.spacing(1),
    width: "95%",
  },
}));

type TitleProps = ResolvedArticle & {
  search?: string;
};

const Title: FC<TitleProps> = (props) => {
  const { slug, title, search } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <StyledLink
      to={Paths.Article(slug)}
      variant={isSizeXS ? "h5" : "h4"}
      className={classes.articleTitle}
      toMatch={search}
    >
      {title}
    </StyledLink>
  );
};

export default Title;

// React Imports
import React, { FC } from "react";
import FloatingIcons from "../../../Shared/FloatingIcons";
import { ResolvedArticle } from "../../../../../Utils/types";

// Material UI Imports
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: "100%",
    padding: theme.spacing(0, 6),
  },
}));

type TitleProps = ResolvedArticle;

const Title: FC<TitleProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div className={classes.titleContainer}>
      <Typography variant={isSizeSmall ? "h5" : "h4"} align="center">
        {props.title}
      </Typography>
      <FloatingIcons
        link={props.link}
        linkLabel="Article"
        direction="row"
        top={0}
      />
    </div>
  );
};

export default Title;

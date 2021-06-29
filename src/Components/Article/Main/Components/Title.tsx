// React Imports
import React, { FC } from "react";
import FloatingIcons from "../../Shared/FloatingIcons";
import { ResolvedArticle } from "../../../../Utils/types";

// Material UI Imports
import {
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

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
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className={classes.titleContainer}>
      <Typography variant={isSizeSmall ? "h4" : "h3"} align="center">
        {props.title}
      </Typography>
      <FloatingIcons {...props} direction="row" top={0} />
    </div>
  );
};

export default Title;

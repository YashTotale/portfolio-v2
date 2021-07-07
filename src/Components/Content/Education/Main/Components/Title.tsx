// React Imports
import React, { FC } from "react";
import FloatingIcons from "../../../Shared/FloatingIcons";
import { ResolvedEducation } from "../../../../../Utils/types";

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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: "100%",
    padding: theme.spacing(0, 6),
  },
  title: {
    [theme.breakpoints.up("sm")]: {
      fontSize: "2.5rem",
    },
  },
}));

type TitleProps = ResolvedEducation & {
  search?: string;
};

const Title: FC<TitleProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className={classes.titleContainer}>
      <Typography
        variant={isSizeSmall ? "h4" : "h3"}
        align="center"
        className={classes.title}
      >
        {props.title}
      </Typography>
      <FloatingIcons
        link={props.link}
        github={props.github}
        linkLabel="Website"
        direction="row"
        top={0}
      />
    </div>
  );
};

export default Title;

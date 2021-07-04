// React Imports
import React, { FC } from "react";
import FloatingIcons from "../../../Shared/FloatingIcons";
import { ResolvedProject } from "../../../../../Utils/types";

// Material UI Imports
import {
  makeStyles,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

interface StyleProps {
  icons: string[];
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: "100%",

    [theme.breakpoints.up("md")]: {
      padding: ({ icons }) => theme.spacing(0, 6 * icons.length),
    },
  },
}));

type TitleProps = ResolvedProject;

const Title: FC<TitleProps> = (props) => {
  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const icons: string[] = [props.github, props.link].filter(
    (icon): icon is string => typeof icon === "string"
  );
  const classes = useStyles({
    icons,
  });

  return (
    <div className={classes.titleContainer}>
      <Typography variant={isSizeSmall ? "h5" : "h4"} align="center">
        {props.title}
      </Typography>
      {!isSizeSmall && (
        <FloatingIcons
          link={props.link}
          linkLabel="Project"
          github={props.github}
          direction="row"
          top={0}
        />
      )}
    </div>
  );
};

export default Title;

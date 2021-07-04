// React Imports
import React, { FC } from "react";
import FloatingIcons from "../../../Shared/FloatingIcons";
import { ResolvedExperience } from "../../../../../Utils/types";
import { generateExperienceTitle } from "../../../../../Utils/Content/experience";

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

type TitleProps = ResolvedExperience;

const Title: FC<TitleProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className={classes.titleContainer}>
      <Typography variant={isSizeSmall ? "h5" : "h4"} align="center">
        {generateExperienceTitle(props)}
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

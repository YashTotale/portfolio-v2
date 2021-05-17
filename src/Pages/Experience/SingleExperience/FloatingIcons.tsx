// React Imports
import React, { FC } from "react";

// Material UI Imports
import { IconButton, makeStyles, Tooltip } from "@material-ui/core";
import { GitHub, Launch } from "@material-ui/icons";
import { ExperienceFields } from "../../../Utils/types";

const useStyles = makeStyles((theme) => ({
  floatingIcons: {
    position: "absolute",
    right: theme.spacing(1),
  },
}));

const FloatingIcons: FC<ExperienceFields> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.floatingIcons}>
      {props.link && (
        <Tooltip title="View Website">
          <IconButton
            component="a"
            href={props.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Launch />
          </IconButton>
        </Tooltip>
      )}
      {props.github && (
        <Tooltip title="View GitHub">
          <IconButton
            component="a"
            href={props.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHub />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

export default FloatingIcons;

// React Imports
import React, { FC } from "react";
import { ProjectFields } from "../../../Utils/types";

// Material UI Imports
import { IconButton, makeStyles, Tooltip } from "@material-ui/core";
import { GitHub, Launch } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  floatingIcons: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

type FloatingIconsProps = Pick<ProjectFields, "link" | "sourceCode">;

const FloatingIcons: FC<FloatingIconsProps> = ({ link, sourceCode }) => {
  const classes = useStyles();

  return (
    <div className={classes.floatingIcons}>
      {link && (
        <Tooltip title="View Project">
          <IconButton
            component="a"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Launch />
          </IconButton>
        </Tooltip>
      )}
      {sourceCode && (
        <Tooltip title="View Source Code">
          <IconButton
            component="a"
            href={sourceCode}
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

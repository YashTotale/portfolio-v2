// React Imports
import React, { FC } from "react";
import LinkIcon from "../../../Components/Icons/LinkIcon";
import { ExperienceFields } from "../../../Utils/types";

// Material UI Imports
import { makeStyles } from "@material-ui/core";
import { GitHub, Launch } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  floatingIcons: {
    position: "absolute",
    right: theme.spacing(1),
  },
}));

const FloatingIcons: FC<ExperienceFields> = ({ link, github }) => {
  const classes = useStyles();

  return (
    <div className={classes.floatingIcons}>
      {link && <LinkIcon label="View Website" href={link} icon={<Launch />} />}
      {github && (
        <LinkIcon label="View GitHub" href={github} icon={<GitHub />} />
      )}
    </div>
  );
};

export default FloatingIcons;

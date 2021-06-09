// React Imports
import React, { FC } from "react";
import LinkIcon from "../../Icon/Link";
import { ResolvedExperience } from "../../../Utils/types";

// Material UI Imports
import { makeStyles } from "@material-ui/core";
import { GitHub, Launch } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
}));

const FloatingIcons: FC<ResolvedExperience> = ({ link, github }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {link && (
        <LinkIcon
          label="View Website"
          href={link}
          icon={<Launch />}
          withResize={false}
        />
      )}
      {github && (
        <LinkIcon
          label="View GitHub"
          href={github}
          icon={<GitHub />}
          withResize={false}
        />
      )}
    </div>
  );
};

export default FloatingIcons;

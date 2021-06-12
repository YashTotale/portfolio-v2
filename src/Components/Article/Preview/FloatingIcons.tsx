// React Imports
import React, { FC } from "react";
import LinkIcon from "../../Icon/Link";
import { ResolvedArticle } from "../../../Utils/types";

// Material UI Imports
import { makeStyles } from "@material-ui/core";
import { Launch } from "@material-ui/icons";

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
  iconButton: {
    [theme.breakpoints.only("xs")]: {
      margin: theme.spacing(1, 0),
    },
  },
}));

const FloatingIcons: FC<ResolvedArticle> = ({ link }) => {
  const classes = useStyles();

  return (
    <div className={classes.floatingIcons}>
      {link && (
        <LinkIcon
          label="View Article"
          href={link}
          icon={<Launch />}
          className={classes.iconButton}
        />
      )}
    </div>
  );
};

export default FloatingIcons;

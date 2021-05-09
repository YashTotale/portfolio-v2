// React Imports
import React, { FC } from "react";
import { getImageTitle, getImageUrl } from "../../../API/helpers";
import { TagFields } from "../../../Utils/types";

// Material UI Imports
import {
  Link,
  makeStyles,
  Tooltip,
  Typography,
  useTheme,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tagDisplay: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    width: "30%",
  },
  tagIcon: {
    margin: theme.spacing(2),

    [theme.breakpoints.only("xl")]: {
      width: 175,
    },

    [theme.breakpoints.only("lg")]: {
      width: 150,
    },

    [theme.breakpoints.only("md")]: {
      width: 150,
    },

    [theme.breakpoints.only("sm")]: {
      width: 125,
    },

    [theme.breakpoints.only("xs")]: {
      width: 100,
    },
  },
}));

const Display: FC<TagFields> = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const isDark = theme.palette.type === "dark";
  const icon = isDark ? props.darkIcon : props.lightIcon;

  const title = (
    <Typography variant="h4" align="center">
      {props.title}
    </Typography>
  );

  return (
    <div className={classes.tagDisplay}>
      {props.link ? (
        <Tooltip title="View Website">
          <Link href={props.link} target="_blank" rel="noopener noreferrer">
            {title}
          </Link>
        </Tooltip>
      ) : (
        title
      )}
      <img
        src={getImageUrl(icon)}
        alt={getImageTitle(icon)}
        className={classes.tagIcon}
      />
    </div>
  );
};

export default Display;

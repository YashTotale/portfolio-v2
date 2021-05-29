// React Imports
import React, { FC } from "react";
import Related from "./Related";
import Icon from "./Icon";
import DynamicPaper from "../../../Components/DynamicPaper";
import MatchHighlight from "../../../Components/MatchHighlight";
import HorizontalDivider from "../../../Components/Divider/Horizontal";
import VerticalDivider from "../../../Components/Divider/Vertical";
import { TagFields } from "../../../Utils/types";

// Redux Imports
import { useSelector } from "react-redux";
import { getTagsSearch } from "../../../Redux";

// Material UI Imports
import {
  Link,
  makeStyles,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "stretch",
    width: "95%",
    margin: theme.spacing(2, 0),
  },
  heading: {
    margin: theme.spacing(1, 0),
  },
  main: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    width: "100%",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
}));

const Tag: FC<TagFields> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const search = useSelector(getTagsSearch);
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <DynamicPaper className={classes.container}>
      {props.link ? (
        <Tooltip title="View Website">
          <Link
            href={props.link}
            target="_blank"
            rel="noopener noreferrer"
            variant={isSizeSmall ? "h5" : "h4"}
            align="center"
            className={classes.heading}
          >
            <MatchHighlight toMatch={search}>{props.title}</MatchHighlight>
          </Link>
        </Tooltip>
      ) : (
        <Typography
          variant={isSizeSmall ? "h5" : "h4"}
          align="center"
          className={classes.heading}
        >
          <MatchHighlight toMatch={search}>{props.title}</MatchHighlight>
        </Typography>
      )}
      <HorizontalDivider />
      <div className={classes.main}>
        <Icon {...props} />
        {!isSizeSmall && <VerticalDivider />}
        <Related {...props} />
      </div>
    </DynamicPaper>
  );
};

export default Tag;

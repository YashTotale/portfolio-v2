// React Imports
import React, { FC } from "react";
import clsx from "clsx";
import Related from "./Related";
import Icon from "./Icon";
import DynamicPaper from "../../DynamicPaper";
import MatchHighlight from "../../MatchHighlight";
import HorizontalDivider from "../../Divider/Horizontal";
import VerticalDivider from "../../Divider/Vertical";
import { getTag } from "../../../Utils/Content/tags";

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

interface TagProps {
  id: string;
  search?: string;
  className?: string;
}

const Tag: FC<TagProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const tag = getTag(props.id);
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("sm"));

  if (!tag) return null;

  return (
    <DynamicPaper className={clsx(classes.container, props.className)}>
      {tag.link ? (
        <Tooltip title="View Website">
          <Link
            href={tag.link}
            target="_blank"
            rel="noopener noreferrer"
            variant={isSizeSmall ? "h5" : "h4"}
            align="center"
            className={classes.heading}
          >
            <MatchHighlight toMatch={props.search}>{tag.title}</MatchHighlight>
          </Link>
        </Tooltip>
      ) : (
        <Typography
          variant={isSizeSmall ? "h5" : "h4"}
          align="center"
          className={classes.heading}
        >
          <MatchHighlight toMatch={props.search}>{tag.title}</MatchHighlight>
        </Typography>
      )}
      <HorizontalDivider />
      <div className={classes.main}>
        <Icon {...tag} />
        {!isSizeSmall && <VerticalDivider />}
        <Related {...tag} />
      </div>
    </DynamicPaper>
  );
};

export default Tag;

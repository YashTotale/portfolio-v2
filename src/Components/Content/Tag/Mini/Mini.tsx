//React Imports
import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import MatchHighlight from "../../../MatchHighlight";
import { getTag } from "../../../../Utils/Content/tags";

//Material UI Imports
import {
  Avatar,
  Chip,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  projectTag: {
    margin: theme.spacing(0.3),
    "& .MuiChip-avatarColorSecondary": {
      backgroundColor: "inherit",
    },
  },
}));

export interface MiniProps {
  id: string;
  search?: string;
  className?: string;
}

const Mini: FC<MiniProps> = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const location = useLocation();
  const tag = getTag(props.id);

  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));
  const isDark = theme.palette.type === "dark";

  if (!tag) return null;

  const icon = isDark ? tag.darkIcon : tag.lightIcon;

  return (
    <Chip
      clickable
      size={isSizeXS ? "small" : "medium"}
      label={
        <MatchHighlight toMatch={props.search}>{tag.title}</MatchHighlight>
      }
      className={clsx(classes.projectTag, props.className)}
      avatar={<Avatar src={`${icon.file.url}?w=30`} alt={icon.title} />}
      component={Link}
      to={{
        pathname: `/tags/${tag.slug}`,
        state: {
          from_path: location.pathname,
          from_type: "mini",
        },
      }}
      color="secondary"
      variant="outlined"
    />
  );
};

export default Mini;

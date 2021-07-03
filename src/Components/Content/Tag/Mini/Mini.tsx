//React Imports
import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import MatchHighlight from "../../../MatchHighlight";
import { useTitle } from "../../../../Context/HeadContext";
import { generateSearch } from "../../../../Utils/funcs";
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
  mini: {
    margin: theme.spacing(0.3),
  },
}));

export interface MiniProps {
  id: string;
  search?: string;
  className?: string;
}

const Mini: FC<MiniProps> = (props) => {
  const classes = useStyles();
  const tag = getTag(props.id);

  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));
  const isDark = theme.palette.type === "dark";

  const location = useLocation();
  const title = useTitle();

  if (!tag) return null;

  const icon = isDark ? tag.darkIcon : tag.lightIcon;

  return (
    <Chip
      clickable
      size={isSizeXS ? "small" : "medium"}
      label={
        <MatchHighlight toMatch={props.search}>{tag.title}</MatchHighlight>
      }
      className={clsx(classes.mini, props.className)}
      avatar={
        <Avatar
          src={`${icon.file.url}?w=30`}
          alt={icon.title}
          style={{
            backgroundColor: "inherit",
          }}
        />
      }
      component={Link}
      to={{
        pathname: `/tags/${tag.slug}`,
        search: generateSearch(
          {
            from_path: location.pathname,
            from_type: "mini",
          },
          title
        ),
      }}
      color="secondary"
      variant="outlined"
    />
  );
};

export default Mini;

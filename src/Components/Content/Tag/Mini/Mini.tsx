//React Imports
import React, { FC } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import MatchHighlight from "../../../Atomic/MatchHighlight";
import { getTag } from "../../../../Utils/Content/tags";

//Material UI Imports
import { Avatar, Chip, useMediaQuery, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

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
  const isDark = theme.palette.mode === "dark";

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
      to={`/tags/${tag.slug}`}
      color="secondary"
      variant="outlined"
    />
  );
};

export default Mini;

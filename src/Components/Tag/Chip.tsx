//React Imports
import React, { FC } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { getTag } from "../../Utils/Content/tags";

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

interface TagChipProps {
  id: string;
  className?: string;
}

const TagChip: FC<TagChipProps> = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const tag = getTag(props.id);

  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));
  const isDark = theme.palette.type === "dark";

  if (!tag) return null;

  const icon = isDark ? tag.darkIcon : tag.lightIcon;

  return (
    <Chip
      clickable
      size={isSizeXS ? "small" : "medium"}
      label={tag.title}
      className={clsx(classes.projectTag, props.className)}
      avatar={<Avatar src={`${icon.file.url}?w=30`} alt={icon.title} />}
      component={Link}
      to={`/tags/${tag.id}`}
      color="secondary"
      variant="outlined"
    />
  );
};

export default TagChip;

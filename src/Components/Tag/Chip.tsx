//React Imports
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { getImageTitle, getImageUrl } from "../../API/helpers";
import { TagFields } from "../../Utils/types";

//Material UI Imports
import {
  Avatar,
  Chip,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

const useTagsStyles = makeStyles((theme) => ({
  projectTag: {
    margin: theme.spacing(0.3),
    "& .MuiChip-avatarColorSecondary": {
      backgroundColor: "inherit",
    },
  },
}));

type TagChipProps = TagFields & {
  id: string;
};

const TagChip: FC<TagChipProps> = ({ title, id, lightIcon, darkIcon }) => {
  const theme = useTheme();
  const classes = useTagsStyles();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  const isDark = theme.palette.type === "dark";

  return (
    <Chip
      clickable
      size={isSizeXS ? "small" : "medium"}
      label={title}
      className={classes.projectTag}
      avatar={
        <Avatar
          src={isDark ? getImageUrl(darkIcon) : getImageUrl(lightIcon)}
          alt={isDark ? getImageTitle(darkIcon) : getImageTitle(lightIcon)}
        />
      }
      component={Link}
      to={`/tags/${id}`}
      color="secondary"
      variant="outlined"
    />
  );
};

export default TagChip;

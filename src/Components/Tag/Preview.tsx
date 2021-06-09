// React Imports
import React, { FC } from "react";
import clsx from "clsx";
import DynamicPaper from "../DynamicPaper";
import DynamicImage from "../DynamicImage";
import { getTag } from "../../Utils/Content/tags";

// Material UI Imports
import { makeStyles, Typography, useTheme } from "@material-ui/core";
import StyledLink from "../StyledLink";
import HorizontalDivider from "../Divider/Horizontal";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
  display: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    margin: theme.spacing(2),
  },
  title: {
    margin: theme.spacing("auto", 1),
    textAlign: "center",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(0, 1),
    margin: theme.spacing(1, "auto"),
  },
}));

interface TagPreviewProps {
  id: string;
  className?: string;
}

const TagPreview: FC<TagPreviewProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const tag = getTag(props.id);

  if (!tag) return null;

  const isDark = theme.palette.type === "dark";
  const icon = isDark ? tag.darkIcon : tag.lightIcon;

  return (
    <DynamicPaper className={clsx(classes.container, props.className)}>
      <div className={classes.display}>
        <DynamicImage
          src={`${icon.file.url}?w=200`}
          alt={icon.title}
          className={classes.icon}
          width={150}
        />
        <StyledLink
          to={`/tags/${tag.id}`}
          variant="h5"
          className={classes.title}
        >
          {tag.title}
        </StyledLink>
      </div>
      <HorizontalDivider flexItem />
      <div className={classes.info}>
        <Related value={tag.experience.length} label="experience" />
        <Related value={tag.projects.length} label="project" />
        <Related value={tag.articles.length} label="article" />
      </div>
    </DynamicPaper>
  );
};

interface RelatedProps {
  value: number;
  label: string;
}

const Related: FC<RelatedProps> = ({ value, label }) => {
  const plural = value !== 1;
  const text = `${value} related ${label}${plural ? "s" : ""}`;

  return <Typography variant="subtitle1">{text}</Typography>;
};

export default TagPreview;

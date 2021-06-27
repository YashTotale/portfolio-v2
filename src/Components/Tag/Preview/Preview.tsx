// React Imports
import React, { cloneElement, FC } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import DynamicPaper from "../../DynamicPaper";
import DynamicImage from "../../DynamicImage";
import StyledLink from "../../StyledLink";
import HorizontalDivider from "../../Divider/Horizontal";
import { getTag } from "../../../Utils/Content/tags";

// Material UI Imports
import { makeStyles, Typography, useTheme } from "@material-ui/core";
import { Build, Description, Work } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  link: {
    flex: 1,
    textDecoration: "none",
    minWidth: 200,
    maxWidth: 250,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
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

export interface PreviewProps {
  id: string;
  search?: string;
  className?: string;
}

const Preview: FC<PreviewProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const tag = getTag(props.id);

  if (!tag) return null;

  const isDark = theme.palette.type === "dark";
  const icon = isDark ? tag.darkIcon : tag.lightIcon;

  return (
    <Link
      to={`/tags/${tag.slug}`}
      className={clsx(classes.link, props.className)}
    >
      <DynamicPaper className={classes.container}>
        <div className={classes.display}>
          <DynamicImage
            src={`${icon.file.url}?w=200`}
            alt={icon.title}
            className={classes.icon}
            width={150}
          />
          <StyledLink
            to={`/tags/${tag.slug}`}
            variant="h5"
            className={classes.title}
            toMatch={props.search}
          >
            {tag.title}
          </StyledLink>
        </div>
        <HorizontalDivider flexItem />
        <div className={classes.info}>
          <Related
            value={tag.experience.length}
            label="experience"
            icon={<Work />}
          />
          <Related
            value={tag.projects.length}
            label="project"
            icon={<Build />}
          />
          <Related
            value={tag.articles.length}
            label="article"
            icon={<Description />}
          />
        </div>
      </DynamicPaper>
    </Link>
  );
};

const useRelatedStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(0.5, 0),
  },
  icon: {
    marginRight: theme.spacing(0.75),
  },
}));

interface RelatedProps {
  value: number;
  label: string;
  icon: JSX.Element;
}

const Related: FC<RelatedProps> = ({ value, label, icon }) => {
  const classes = useRelatedStyles();

  const plural = value !== 1;
  const text = `${value} related ${label}${plural ? "s" : ""}`;

  const iconToRender = cloneElement(icon, {
    className: classes.icon,
    fontSize: "small",
    color: "disabled",
  });

  return (
    <div className={classes.container}>
      {iconToRender}
      <Typography variant="subtitle1">{text}</Typography>
    </div>
  );
};

export default Preview;

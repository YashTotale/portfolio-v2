// React Imports
import React, { FC } from "react";
import clsx from "clsx";
import { Document } from "@contentful/rich-text-types";
import RichText from "../../../Custom/RichText";
import DynamicImage from "../../../Atomic/DynamicImage";
import StyledLink from "../../../Atomic/StyledLink";
import MatchHighlight from "../../../Atomic/MatchHighlight";
import VerticalDivider from "../../../Atomic/Divider/Vertical";
import HorizontalDivider from "../../../Atomic/Divider/Horizontal";
import {
  generateExperienceSubtitle,
  generateExperienceTimeline,
  generateExperienceTitle,
  getSingleExperience,
} from "../../../../Utils/Content/experience";

// Material UI Imports
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: "5px",

    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
    },
  },
  image: {
    margin: theme.spacing(2),

    [theme.breakpoints.only("xl")]: {
      height: 175,
    },

    [theme.breakpoints.only("lg")]: {
      height: 150,
    },

    [theme.breakpoints.only("md")]: {
      height: 150,
    },

    [theme.breakpoints.only("sm")]: {
      height: 125,
    },

    [theme.breakpoints.only("xs")]: {
      height: 100,
      marginBottom: 0,
    },
  },
  info: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "stretch",
  },
  title: {
    margin: theme.spacing(1, 1, 0),

    [theme.breakpoints.only("xs")]: {
      lineHeight: 1.3,
    },
  },
  subtitle: {},
  titleDivider: {
    marginTop: theme.spacing(1),
  },
  description: {
    width: "100%",
    padding: theme.spacing(1),
    textAlign: "center",
    flex: 1,

    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(0, 1),
    },
  },
  timeline: {
    margin: theme.spacing(1),
  },
}));

export interface AssociatedProps {
  id: string;
  search?: string;
  className?: string;
}

const Associated: FC<AssociatedProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));
  const isDark = theme.palette.mode === "dark";

  const exp = getSingleExperience(props.id);
  if (!exp) return null;

  const image = isDark ? exp.darkImage : exp.lightImage;

  return (
    <div className={clsx(classes.container, props.className)}>
      <DynamicImage
        src={`${image.file.url}?h=175`}
        alt={image.title}
        className={classes.image}
      />
      {!isSizeXS && <VerticalDivider />}
      <div className={classes.info}>
        <StyledLink
          variant="h6"
          align="center"
          to={`/experience/${exp.slug}`}
          className={classes.title}
          toMatch={props.search}
        >
          {generateExperienceTitle(exp)}
        </StyledLink>
        <Typography variant="subtitle2" align="center" color="textSecondary">
          {generateExperienceSubtitle(exp)}
        </Typography>
        {!isSizeXS && <HorizontalDivider className={classes.titleDivider} />}
        <div className={classes.description}>
          <RichText
            richText={exp.description as Document}
            variant={isSizeXS ? "body2" : "body1"}
            toMatch={props.search}
          />
        </div>
        {!isSizeXS && <HorizontalDivider />}
        <div className={classes.timeline}>
          <Typography variant={isSizeXS ? "body2" : "body1"}>
            <MatchHighlight toMatch={props.search}>
              {generateExperienceTimeline(exp)}
            </MatchHighlight>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Associated;

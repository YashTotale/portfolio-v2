// React Imports
import React, { FC } from "react";
import clsx from "clsx";
import { Document } from "@contentful/rich-text-types";
import RichText from "../../../RichText";
import DynamicImage from "../../../DynamicImage";
import StyledLink from "../../../StyledLink";
import VerticalDivider from "../../../Divider/Vertical";
import HorizontalDivider from "../../../Divider/Horizontal";
import {
  generateExperienceTitle,
  getSingleExperience,
} from "../../../../Utils/Content/experience";

// Material UI Imports
import {
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import MatchHighlight from "../../../MatchHighlight";

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
    margin: theme.spacing(1),

    [theme.breakpoints.only("xl")]: {
      width: 175,
      height: 175,
    },

    [theme.breakpoints.only("lg")]: {
      width: 150,
      height: 150,
    },

    [theme.breakpoints.only("md")]: {
      width: 150,
      height: 150,
    },

    [theme.breakpoints.only("sm")]: {
      width: 125,
      height: 125,
    },

    [theme.breakpoints.only("xs")]: {
      width: 100,
      height: 100,
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
    margin: theme.spacing(1),

    [theme.breakpoints.only("xs")]: {
      lineHeight: 1.3,
    },
  },
  description: {
    margin: theme.spacing(1),
    textAlign: "center",
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
  const experience = getSingleExperience(props.id);
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  if (!experience) return null;

  return (
    <div className={clsx(classes.container, props.className)}>
      <DynamicImage
        src={`${experience.image.file.url}?w=175`}
        alt={experience.image.title}
        className={classes.image}
      />
      {!isSizeXS && <VerticalDivider />}
      <div className={classes.info}>
        <StyledLink
          variant="h6"
          align="center"
          to={`/experience/${experience.slug}`}
          className={classes.title}
          toMatch={props.search}
        >
          {generateExperienceTitle(experience)}
        </StyledLink>
        <HorizontalDivider />
        <div className={classes.description}>
          <RichText
            richText={experience.description as Document}
            toMatch={props.search}
          />
        </div>
        <HorizontalDivider />
        <div className={classes.timeline}>
          <Typography>
            <MatchHighlight toMatch={props.search}>
              {`${experience.start} - ${experience.end ?? "Present"}`}
            </MatchHighlight>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Associated;

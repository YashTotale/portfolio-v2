// React Imports
import React, { FC } from "react";
import { Asset, EntryFields } from "contentful";
import clsx from "clsx";
import { Document } from "@contentful/rich-text-types";
import RichText from "../../../RichText";
import DynamicImage from "../../../DynamicImage";
import StyledLink from "../../../StyledLink";
import VerticalDivider from "../../../Divider/Vertical";
import HorizontalDivider from "../../../Divider/Horizontal";
import { generateSearch } from "../../../../Utils/funcs";

// Material UI Imports
import {
  makeStyles,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import MatchHighlight from "../../../MatchHighlight";
import { useLocation } from "react-router-dom";
import { useTitle } from "../../../../Context/HeadContext";

interface StyleProps {
  basePath: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
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
    textAlign: ({ basePath }) => (basePath === "projects" ? "start" : "center"),
    flex: 1,

    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(0, 1),
    },
  },
  timeline: {
    margin: theme.spacing(1),
  },
}));

interface Content {
  title: string;
  slug: string;
  description: EntryFields.RichText;
  image: Asset["fields"];
}

export interface AssociatedProps {
  content: Content | null;
  basePath: string;
  timelineFunc: (content: any) => string;
  titleFunc?: (content: any) => string;
  subtitleFunc?: (content: any) => string;
  search?: string;
  className?: string;
}

const Associated: FC<AssociatedProps> = (props) => {
  const classes = useStyles({ basePath: props.basePath });
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  const location = useLocation();
  const title = useTitle();

  if (!props.content) return null;

  return (
    <div className={clsx(classes.container, props.className)}>
      <DynamicImage
        src={`${props.content.image.file.url}?h=175`}
        alt={props.content.image.title}
        className={classes.image}
      />
      {!isSizeXS && <VerticalDivider />}
      <div className={classes.info}>
        <StyledLink
          variant="h6"
          align="center"
          to={{
            pathname: `/${props.basePath}/${props.content.slug}`,
            search: generateSearch(
              {
                from_path: location.pathname,
                from_type: "associated",
              },
              title
            ),
          }}
          className={classes.title}
          toMatch={props.search}
        >
          {props.titleFunc
            ? props.titleFunc(props.content)
            : props.content.title}
        </StyledLink>
        {props.subtitleFunc && (
          <Typography variant="subtitle2" align="center" color="textSecondary">
            {props.subtitleFunc(props.content)}
          </Typography>
        )}
        {!isSizeXS && <HorizontalDivider className={classes.titleDivider} />}
        <div className={classes.description}>
          <RichText
            richText={props.content.description as Document}
            variant={isSizeXS ? "body2" : "body1"}
            toMatch={props.search}
          />
        </div>
        {!isSizeXS && <HorizontalDivider />}
        <div className={classes.timeline}>
          <Typography variant={isSizeXS ? "body2" : "body1"}>
            <MatchHighlight toMatch={props.search}>
              {props.timelineFunc(props.content)}
            </MatchHighlight>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Associated;

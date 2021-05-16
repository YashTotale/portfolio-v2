// React Imports
import React, { FC } from "react";
import { Document } from "@contentful/rich-text-types";
import RichText from "../../../Components/RichText";
import MatchHighlight from "../../../Components/MatchHighlight";
import StyledLink from "../../../Components/StyledLink";
import { getImageTitle, getImageUrl } from "../../../API/helpers";
import { ExperienceFields } from "../../../Utils/types";

// Redux Imports
import { useSelector } from "react-redux";
import { getExperienceSearch } from "../../../Redux";

// Material UI Imports
import {
  Divider,
  IconButton,
  makeStyles,
  Paper,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { GitHub, Launch } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "stretch",
    width: "95%",
    margin: theme.spacing(2, 0),
  },
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing(1, 0),
    width: "100%",
    position: "relative",
    minHeight: theme.spacing(6),
  },
  rightIcons: {
    position: "absolute",
    right: theme.spacing(1),
  },
  divider: {
    height: "1px",
  },
  main: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    width: "100%",
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    padding: theme.spacing(2),
  },
  image: {
    [theme.breakpoints.only("xl")]: {
      width: 225,
    },

    [theme.breakpoints.only("lg")]: {
      width: 200,
    },

    [theme.breakpoints.only("md")]: {
      width: 175,
    },

    [theme.breakpoints.only("sm")]: {
      width: 150,
    },

    [theme.breakpoints.only("xs")]: {
      width: 125,
    },
  },
  verticalDivider: {
    width: "2px",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "70%",
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  heading: {
    margin: theme.spacing(1, 0),
  },
  role: {
    margin: theme.spacing(1, 0),
  },
}));

const SingleExperience: FC<ExperienceFields> = (props) => {
  const classes = useStyles();
  const search = useSelector(getExperienceSearch);

  return (
    <Paper className={classes.container}>
      <div className={classes.titleContainer}>
        <StyledLink
          to={`/experience/${props.id}`}
          variant="h4"
          toMatch={search}
        >
          {props.title}
        </StyledLink>
        <div className={classes.rightIcons}>
          {props.link && (
            <Tooltip title="View Website">
              <IconButton
                component="a"
                href={props.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Launch />
              </IconButton>
            </Tooltip>
          )}
          {props.github && (
            <Tooltip title="View GitHub">
              <IconButton
                component="a"
                href={props.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHub />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </div>
      <Divider flexItem className={classes.divider} />
      <div className={classes.main}>
        <div className={classes.imageContainer}>
          <img
            src={getImageUrl(props.image)}
            alt={getImageTitle(props.image)}
            className={classes.image}
          />
        </div>
        <Divider
          orientation="vertical"
          flexItem
          className={classes.verticalDivider}
        />
        <div className={classes.info}>
          <Typography variant="h5" className={classes.heading}>
            Role
          </Typography>
          <Typography variant="body2" className={classes.role}>
            <MatchHighlight toMatch={search}>
              {`${props.role} (${props.start} - ${props.end ?? "Present"})`}
            </MatchHighlight>
          </Typography>
          <Typography variant="h5" className={classes.heading}>
            Description
          </Typography>
          <RichText richText={props.description as Document} toMatch={search} />
          <Typography variant="h5" className={classes.heading}>
            Responsibilities
          </Typography>
          <RichText
            richText={props.responsibilities as Document}
            toMatch={search}
          />
        </div>
      </div>
    </Paper>
  );
};

export default SingleExperience;

// React Imports
import React, { FC } from "react";
import { Document } from "@contentful/rich-text-types";
import Info from "../../../Components/Info";
import { getImageTitle, getImageUrl } from "../../../API/helpers";
import { ExperienceFields } from "../../../Utils/types";

// Material UI Imports
import { Divider, makeStyles, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "stretch",
    width: "95%",
    margin: theme.spacing(2, 0),
  },
  title: {
    margin: theme.spacing(1, 0),
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
}));

const SingleExperience: FC<ExperienceFields> = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        {props.title}
      </Typography>
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
            Description
          </Typography>
          <Info richText={props.description as Document} />
          <Typography variant="h5" className={classes.heading}>
            Responsibilities
          </Typography>
          <Info richText={props.responsibilities as Document} />
        </div>
      </div>
    </Paper>
  );
};

export default SingleExperience;

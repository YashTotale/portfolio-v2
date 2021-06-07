// React Imports
import React, { FC } from "react";
import { Document } from "@contentful/rich-text-types";
import Related from "./Related";
import RichText from "../../../../Components/RichText";
import { ResolvedExperience } from "../../../../Utils/types";

// Redux Imports
import { useSelector } from "react-redux";
import { getExperienceSearch } from "../../../../Redux";

// Material UI Imports
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  info: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "70%",
    flexGrow: 1,
    padding: theme.spacing(2),

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      paddingTop: 0,
      alignItems: "center",
      justifyContent: "center",
    },
  },
  heading: {
    margin: theme.spacing(1, 0),
    width: "100%",

    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  text: {
    width: "100%",
  },
}));

const Info: FC<ResolvedExperience> = (props) => {
  const classes = useStyles();
  const search = useSelector(getExperienceSearch);

  return (
    <div className={classes.info}>
      <Typography variant="h5" className={classes.heading}>
        Description
      </Typography>
      <div className={classes.text}>
        <RichText richText={props.description as Document} toMatch={search} />
      </div>
      <Typography variant="h5" className={classes.heading}>
        Responsibilities
      </Typography>
      <div className={classes.text}>
        <RichText
          richText={props.responsibilities as Document}
          toMatch={search}
        />
      </div>
      <Related {...props} />
    </div>
  );
};

export default Info;

// React Imports
import React, { FC } from "react";
import { Document } from "@contentful/rich-text-types";
import Related from "./Related";
import MatchHighlight from "../../../../Components/MatchHighlight";
import RichText from "../../../../Components/RichText";
import { ExperienceFields } from "../../../../Utils/types";

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
  },
  heading: {
    margin: theme.spacing(1, 0),
  },
  role: {
    margin: theme.spacing(1, 0),
  },
}));

const Info: FC<ExperienceFields> = (props) => {
  const classes = useStyles();
  const search = useSelector(getExperienceSearch);

  return (
    <div className={classes.info}>
      <Typography variant="h5" className={classes.heading}>
        Role
      </Typography>
      <Typography variant="body2" className={classes.role}>
        <strong>
          <MatchHighlight toMatch={search}>{props.role}</MatchHighlight>
        </strong>{" "}
        <MatchHighlight toMatch={search}>
          {`(${props.start} - ${props.end ?? "Present"})`}
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
      <Related {...props} />
    </div>
  );
};

export default Info;

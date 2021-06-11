// React Imports
import React, { FC } from "react";
import NotFound from "../NotFound";

// Material UI Imports
import { makeStyles } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { getSingleExperience } from "../../Utils/Content/experience";
import ExperienceMain from "../../Components/Experience/Main";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",

    [theme.breakpoints.only("xl")]: {
      width: "75%",
    },

    [theme.breakpoints.only("lg")]: {
      width: "85%",
    },

    [theme.breakpoints.only("md")]: {
      width: "85%",
    },

    [theme.breakpoints.only("sm")]: {
      width: "95%",
    },

    [theme.breakpoints.only("xs")]: {
      width: "95%",
    },
  },
}));

interface Params {
  id: string;
}

const SingleExperience: FC = () => {
  const { id } = useParams<Params>();
  const classes = useStyles();
  const experience = getSingleExperience(id);

  if (!experience)
    return (
      <NotFound
        name="experience"
        redirect="/experience"
        redirectName="Experience Page"
      />
    );

  return (
    <div className={classes.container}>
      <ExperienceMain id={id} />
    </div>
  );
};

export default SingleExperience;

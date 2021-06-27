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
  },
}));

interface Params {
  slug: string;
}

const SingleExperience: FC = () => {
  const { slug } = useParams<Params>();
  const classes = useStyles();
  const experience = getSingleExperience(slug, true);

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
      <ExperienceMain id={experience.id} />
    </div>
  );
};

export default SingleExperience;

// React Imports
import React, { FC } from "react";
import { useParams, useLocation } from "react-router-dom";
import NotFound from "../NotFound";
import ExperienceMain from "../../Components/Content/Experience/Main";
import { analytics } from "../../Utils/Config/firebase";
import {
  generateExperienceTitle,
  getSingleExperience,
} from "../../Utils/Content/experience";

// Material UI Imports
import { makeStyles } from "@material-ui/core";

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
  const location = useLocation();
  const experience = getSingleExperience(slug, true);

  if (!experience)
    return (
      <NotFound
        name="experience"
        redirect="/experience"
        redirectName="Experience Page"
      />
    );

  analytics.logEvent("page_view", {
    page_title: generateExperienceTitle(experience),
    ...(location.state as Record<string, unknown>),
  });

  return (
    <div className={classes.container}>
      <ExperienceMain id={experience.id} />
    </div>
  );
};

export default SingleExperience;

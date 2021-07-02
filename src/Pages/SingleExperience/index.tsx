// React Imports
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useAnalytics } from "../../Hooks";
import NotFound from "../NotFound";
import ExperienceMain from "../../Components/Content/Experience/Main";
import { generatePageTitle } from "../../Utils/funcs";
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

  const experience = getSingleExperience(slug, true);

  useAnalytics(experience && generateExperienceTitle(experience));

  if (!experience)
    return (
      <NotFound
        name="experience"
        redirect="/experience"
        redirectName="Experience Page"
      />
    );

  return (
    <>
      <Helmet>
        <title>{generatePageTitle(experience.title)}</title>
      </Helmet>
      <div className={classes.container}>
        <ExperienceMain id={experience.id} />
      </div>
    </>
  );
};

export default SingleExperience;

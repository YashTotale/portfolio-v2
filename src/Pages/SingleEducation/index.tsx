// React Imports
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useAnalytics } from "../../Hooks";
import NotFound from "../NotFound";
import TopNav from "../../Components/Custom/Navigation/TopNav";
import BottomNav from "../../Components/Custom/Navigation/BottomNav";
import EducationMain from "../../Components/Content/Education/Main";
import { generatePageTitle } from "../../Utils/funcs";
import {
  getSingleEducation,
  useSortedEducation,
} from "../../Utils/Content/education";

// Material UI Imports
import makeStyles from "@mui/styles/makeStyles";

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

const SingleEducation: FC = () => {
  const { slug } = useParams<Params>();
  const classes = useStyles();

  const education = getSingleEducation(slug, true);
  const sortedEducation = useSortedEducation();

  useAnalytics(education?.title);

  if (!education)
    return (
      <NotFound
        name="experience"
        redirect="/experience"
        redirectName="Experience Page"
      />
    );

  const educationIndex = sortedEducation.findIndex(
    (p) => p.id === education.id
  );
  const prevEducation = sortedEducation[educationIndex - 1];
  const nextEducation = sortedEducation[educationIndex + 1];

  return (
    <>
      <Helmet>
        <title>{generatePageTitle(education.title)}</title>
      </Helmet>
      <div className={classes.container}>
        <TopNav allPath="education" allLabel="Education" />
        <EducationMain id={education.id} />
        <BottomNav
          basePath="education"
          label="Education"
          prevContent={prevEducation}
          nextContent={nextEducation}
        />
      </div>
    </>
  );
};

export default SingleEducation;

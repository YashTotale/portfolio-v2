// React Imports
import React, { FC } from "react";

// Material UI Imports
import { makeStyles } from "@material-ui/core";
import Section from "./Section";

const useStyles = makeStyles((theme) => ({}));

const Profile: FC = () => {
  const classes = useStyles();

  return <Section title="Profile"></Section>;
};

export default Profile;

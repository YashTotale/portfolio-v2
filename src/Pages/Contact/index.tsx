// React Imports
import React, { FC } from "react";
import { useForm } from "react-hook-form";

// Material UI Imports
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
  },
}));

const Contact: FC = () => {
  const classes = useStyles();
  const form = useForm();

  return (
    <div className={classes.container}>
      <form></form>
    </div>
  );
};

export default Contact;

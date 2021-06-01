//React Imports
import React, { FC } from "react";
import { Document } from "@contentful/rich-text-types";
import Typer from "./Typer";
import RichText from "../../Components/RichText";

// Data Imports
import main from "../../Data/main.json";

//Material UI Imports
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  home: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    maxWidth: "95%",
    margin: "auto",
  },
  typist: {
    display: "inline-block",
  },
}));

const Home: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.home}>
      <Typography variant="h1">Yash Totale</Typography>
      <Typer />
      <RichText richText={main.description as Document} variant="body1" />
    </div>
  );
};

export default Home;

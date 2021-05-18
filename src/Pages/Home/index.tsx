//React Imports
import React, { FC } from "react";
import { Document } from "@contentful/rich-text-types";
import Typer from "./Typer";
import RichText from "../../Components/RichText";
import { useMainData } from "../../Context/DataContext";

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
  const mainData = useMainData();

  console.log(mainData);

  return (
    <div className={classes.home}>
      <Typography variant="h1">Yash Totale</Typography>
      <Typer />
      {mainData !== null && (
        <RichText richText={mainData.description as Document} variant="body1" />
      )}
    </div>
  );
};

export default Home;

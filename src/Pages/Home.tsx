//React Imports
import React, { FC } from "react";

//Material UI Imports
import { makeStyles, Theme, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  home: {},
}));

const Home: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.home}>
      <Typography variant="h1" align="center">
        Boilerplate React with Redux and Firebase
      </Typography>
      <Typography variant="h6" align="center">
        Edit <code>src/Pages/Home.tsx</code> to view live changes!
      </Typography>
    </div>
  );
};

export default Home;

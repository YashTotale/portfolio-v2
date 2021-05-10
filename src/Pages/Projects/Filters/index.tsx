// React Imports
import React, { FC } from "react";
import SearchBar from "./SearchBar";
import { PROJECT_WIDTHS } from "../Project/index";

// Material UI Imports
import { Divider, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",

    [theme.breakpoints.only("xl")]: {
      width: PROJECT_WIDTHS.xl * 2 + theme.spacing() * 4,
    },

    [theme.breakpoints.only("lg")]: {
      width: PROJECT_WIDTHS.lg * 2 + theme.spacing() * 4,
    },

    [theme.breakpoints.only("md")]: {
      width: PROJECT_WIDTHS.md * 2 + theme.spacing() * 4,
    },

    [theme.breakpoints.only("sm")]: {
      width: PROJECT_WIDTHS.sm,
    },

    [theme.breakpoints.only("xs")]: {
      width: PROJECT_WIDTHS.xs,
    },
  },
  projectFilters: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  divider: {
    height: "1px",
    margin: theme.spacing(1, 0),
  },
}));

const Filters: FC = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <div className={classes.projectFilters}>
          <SearchBar />
        </div>
        <Divider flexItem className={classes.divider} />
      </div>
    </>
  );
};

export default Filters;

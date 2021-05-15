// React Imports
import React, { FC } from "react";
import SearchBar from "./SearchBar";

// Material UI Imports
import { Divider, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  filters: {
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

interface FiltersProps {
  defaultSearch: string;
  onSearchChange: (value: string) => void;
  className?: string;
}

const Filters: FC<FiltersProps> = (props) => {
  const classes = useStyles();

  return (
    <>
      <div className={`${classes.container} ${props.className}`}>
        <div className={classes.filters}>
          <SearchBar {...props} />
        </div>
        <Divider flexItem className={classes.divider} />
      </div>
    </>
  );
};

export default Filters;

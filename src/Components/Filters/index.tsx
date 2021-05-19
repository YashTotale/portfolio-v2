// React Imports
import React, { FC } from "react";
import clsx from "clsx";
import Sorter, { SorterProps } from "./Sorter";
import SearchBar from "./SearchBar";
import HorizontalDivider from "../Divider/Horizontal";

// Material UI Imports
import { makeStyles } from "@material-ui/core";

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
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "100%",
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
}));

interface FiltersProps {
  defaultSearch: string;
  onSearchChange: (value: string) => void;
  className?: string;
  sort?: SorterProps;
}

const Filters: FC<FiltersProps> = (props) => {
  const classes = useStyles();

  return (
    <>
      <div className={clsx(classes.container, props.className)}>
        <div className={classes.filters}>
          {props.sort && <Sorter {...props.sort} />}
          <SearchBar {...props} />
        </div>
        <HorizontalDivider className={classes.divider} />
      </div>
    </>
  );
};

export default Filters;

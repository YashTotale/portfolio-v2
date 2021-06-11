// React Imports
import React, { FC, cloneElement, ReactElement } from "react";
import clsx from "clsx";
import SearchBar, { SearchBarProps } from "./SearchBar";
import Sorter, { SorterProps } from "./Sorter";
import Related, { RelatedProps } from "./Related";
import HorizontalDivider from "../Divider/Horizontal";

// Material UI Imports
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  filters: {
    display: "flex",
    flexDirection: "column",
    width: "95%",
    border: `1px solid ${theme.palette.text.disabled}`,
    borderRadius: "10px",
    marginBottom: theme.spacing(1),
  },
  filter: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    margin: theme.spacing(2),
  },
  filterAction: {
    [theme.breakpoints.only("xl")]: {
      width: "40%",
    },

    [theme.breakpoints.only("lg")]: {
      width: "40%",
    },

    [theme.breakpoints.only("md")]: {
      width: "50%",
    },

    [theme.breakpoints.only("sm")]: {
      height: theme.spacing(5),
      width: "75%",
    },

    [theme.breakpoints.only("xs")]: {
      height: theme.spacing(5),
      width: "100%",
    },
  },
  filterLabel: {
    minWidth: 110,
  },
}));

interface FiltersProps {
  className?: string;
  sort?: SorterProps;
  search?: SearchBarProps;
  related?: RelatedProps[];
}

const Filters: FC<FiltersProps> = (props) => {
  const classes = useStyles();

  return (
    <>
      <div className={clsx(classes.filters, props.className)}>
        {props.search && <SearchBar {...props.search} />}
        {props.sort && <Sorter {...props.sort} />}
        {props.related &&
          props.related.map((props) => (
            <Related {...props} key={props.label} />
          ))}
      </div>
    </>
  );
};

interface FilterProps {
  label: string;
  children: ReactElement;
}

export const Filter: FC<FilterProps> = (props) => {
  const classes = useStyles();
  const filterAction = cloneElement(props.children, {
    className: classes.filterAction,
  });

  return (
    <>
      <div className={classes.filter}>
        <Typography variant="subtitle1" className={classes.filterLabel}>
          <strong>{props.label}</strong>
        </Typography>
        {filterAction}
      </div>
      <HorizontalDivider />
    </>
  );
};

export default Filters;

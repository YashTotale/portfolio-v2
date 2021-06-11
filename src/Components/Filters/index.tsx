// React Imports
import React, { FC, cloneElement, ReactElement } from "react";
import clsx from "clsx";
import SearchBar, { SearchBarProps } from "./SearchBar";
import Sorter, { SorterProps } from "./Sorter";
import Related, { RelatedProps } from "./Related";
import HorizontalDivider from "../Divider/Horizontal";

// Material UI Imports
import { IconButton, makeStyles, Tooltip, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  filters: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    border: `1px solid ${theme.palette.text.disabled}`,
    borderRadius: "10px",
    marginBottom: theme.spacing(1),
  },
  filter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: theme.spacing(1, 2),
  },
  filterItem: {
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
      width: "75%",
    },

    [theme.breakpoints.only("xs")]: {
      width: "100%",
    },
  },
  filterLabel: {
    minWidth: 155,
  },
  filterActions: {
    marginLeft: "auto",
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
  actions?: FilterActionProps[];
}

export const Filter: FC<FilterProps> = (props) => {
  const classes = useStyles();
  const filterItem = cloneElement(props.children, {
    className: classes.filterItem,
  });

  return (
    <>
      <div className={classes.filter}>
        <Typography variant="subtitle1" className={classes.filterLabel}>
          <strong>{props.label}</strong>
        </Typography>
        {filterItem}
        {props.actions && (
          <div className={classes.filterActions}>
            {props.actions.map((props, i) => (
              <FilterAction key={i} {...props} />
            ))}
          </div>
        )}
      </div>
      <HorizontalDivider />
    </>
  );
};

interface FilterActionProps {
  label: string;
  icon: JSX.Element;
  action: () => void;
}

const FilterAction: FC<FilterActionProps> = (props) => {
  return (
    <Tooltip title={props.label}>
      <IconButton onClick={props.action}>{props.icon}</IconButton>
    </Tooltip>
  );
};

export default Filters;

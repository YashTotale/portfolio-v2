// React Imports
import React, { FC, cloneElement, ReactElement } from "react";
import clsx from "clsx";
import SearchBar, { SearchBarProps } from "./SearchBar";
import Sorter, { SorterProps } from "./Sorter";
import Related, { RelatedProps } from "./Related";
import HorizontalDivider from "../Divider/Horizontal";

// Material UI Imports
import {
  IconButton,
  makeStyles,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

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

    [theme.breakpoints.only("xs")]: {
      margin: theme.spacing(1),
    },
  },
  filterItem: {
    [theme.breakpoints.down("xl")]: {
      width: "40%",
    },

    [theme.breakpoints.down("md")]: {
      width: "50%",
    },

    [theme.breakpoints.down("sm")]: {
      width: "75%",
    },

    [theme.breakpoints.only("xs")]: {
      width: "100%",
    },
  },
  filterLabel: {
    minWidth: 155,

    [theme.breakpoints.only("xs")]: {
      minWidth: 135,
    },
  },
  filterActions: {
    marginLeft: "auto",

    [theme.breakpoints.only("xs")]: {
      marginLeft: theme.spacing(1),
    },
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
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  const filterItem = cloneElement(props.children, {
    className: classes.filterItem,
  });

  return (
    <>
      <div className={classes.filter}>
        {!isSizeXS && (
          <Typography
            variant={isSizeXS ? "subtitle2" : "subtitle1"}
            className={classes.filterLabel}
          >
            <strong>{props.label}</strong>
          </Typography>
        )}
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
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  const actionIcon = cloneElement(props.icon, {
    fontSize: isSizeXS ? "small" : "default",
  });

  return (
    <Tooltip title={props.label}>
      <IconButton size={isSizeXS ? "small" : "medium"} onClick={props.action}>
        {actionIcon}
      </IconButton>
    </Tooltip>
  );
};

export default Filters;

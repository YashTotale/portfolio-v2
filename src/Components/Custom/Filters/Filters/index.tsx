// React Imports
import React, { FC, cloneElement, ReactElement, useState } from "react";
import clsx from "clsx";
import SearchBar, { SearchBarProps } from "./SearchBar";
import Sorter, { SorterProps } from "./Sorter";
import Related, { RelatedProps } from "./Related";
import HorizontalDivider from "../../../Atomic/Divider/Horizontal";
import ResponsiveIcon from "../../../Atomic/Icon/Responsive";

// Material UI Imports
import {
  Button,
  Collapse,
  makeStyles,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { ExpandLess } from "@material-ui/icons";

interface StyleProps {
  open: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  filters: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    border: `1px solid ${theme.palette.text.disabled}`,
    borderRadius: "10px",
    marginBottom: theme.spacing(1),
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  titleButton: {
    borderRadius: 0,
    position: "relative",
    [theme.breakpoints.up("sm")]: {
      minHeight: theme.spacing(7),
    },
  },
  title: {
    textTransform: "none",
    width: "100%",
    [theme.breakpoints.only("xs")]: {
      fontSize: "1.1rem",
    },
  },
  titleIcon: {
    position: "absolute",
    right: theme.spacing(3.5),
    transition: theme.transitions.create("transform", {
      duration: "0.4s",
    }),
    transform: ({ open }) => (open ? "rotate(0deg)" : "rotate(180deg)"),
    [theme.breakpoints.only("xs")]: {
      right: theme.spacing(1) + 3,
    },
  },
}));

export interface FiltersProps {
  sort?: SorterProps;
  search?: SearchBarProps;
  related?: RelatedProps[];
  className?: string;
}

const Filters: FC<FiltersProps> = (props) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  const classes = useStyles({
    open,
  });

  return (
    <>
      <div className={clsx(classes.filters, props.className)}>
        <Button className={classes.titleButton} onClick={() => setOpen(!open)}>
          <Typography align="center" variant="h6" className={classes.title}>
            Filters
          </Typography>
          <ExpandLess
            fontSize={isSizeXS ? "small" : "default"}
            className={classes.titleIcon}
          />
        </Button>
        {open && <HorizontalDivider />}
        <Collapse in={open} timeout="auto">
          {props.search && <SearchBar {...props.search} />}
          {props.sort && <Sorter {...props.sort} />}
          {props.related &&
            props.related.map((related, i) => (
              <Related
                {...related}
                key={related.label}
                last={i === (props.related?.length ?? 0) - 1}
              />
            ))}
        </Collapse>
      </div>
    </>
  );
};

const useFilterStyles = makeStyles((theme) => ({
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

interface FilterProps {
  label: string;
  children: ReactElement;
  last?: boolean;
  actions?: FilterActionProps[];
}

export const Filter: FC<FilterProps> = (props) => {
  const classes = useFilterStyles();
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  const filterItem = cloneElement(props.children, {
    className: classes.filterItem,
  });

  return (
    <>
      <div className={classes.filter}>
        {!isSizeXS && (
          <Typography variant="subtitle1" className={classes.filterLabel}>
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
      {!props.last && <HorizontalDivider />}
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
      <ResponsiveIcon onClick={props.action}>{props.icon}</ResponsiveIcon>
    </Tooltip>
  );
};

export default Filters;

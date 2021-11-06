// React Imports
import React, { cloneElement, FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { LocationDescriptor } from "history";

// Material UI Imports
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Theme,
  ListItemIcon,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { ExpandLess } from "@mui/icons-material";

interface StyleProps {
  open: boolean;
  isActive: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  link: {
    color: theme.palette.text.primary,
    textDecoration: "none",
  },
  listItemContainer: {
    padding: theme.spacing(0),
  },
  listItem: {
    padding: theme.spacing(0.75, 1),
    paddingLeft: theme.spacing(3),
  },
  listItemIcon: {
    minWidth: theme.spacing(4),
  },
  listItemText: {
    fontWeight: theme.typography.fontWeightBold,
    color: ({ isActive }) =>
      isActive ? theme.palette.primary.main : theme.palette.text.primary,
  },
  arrow: ({ open }) => ({
    transform: open ? "rotate(0deg)" : "rotate(180deg)",
    transition: "0.5s",
  }),
}));

interface CategoryProps {
  to: LocationDescriptor;
  label: string;
  icon: JSX.Element;
}

const Category: FC<CategoryProps> = ({ label, to, icon, children }) => {
  const pathname = useLocation().pathname;
  const curr = typeof to === "string" ? to : to.pathname ?? "";
  const open = pathname.includes(curr);
  const isActive = pathname === curr;
  const classes = useStyles({ open, isActive });

  return (
    <li className={classes.listItemContainer}>
      <Link
        to={pathname === curr && children ? "/" : to}
        className={classes.link}
      >
        <ListItem button className={classes.listItem}>
          <ListItemIcon className={classes.listItemIcon}>
            {cloneElement(icon, {
              fontSize: "small",
              color: isActive ? "primary" : "inherit",
            })}
          </ListItemIcon>
          <ListItemText
            primary={label}
            classes={{
              primary: classes.listItemText,
            }}
          />
          {children && <ExpandLess className={classes.arrow} />}
        </ListItem>
      </Link>
      {children && (
        <Collapse in={open} timeout="auto">
          <List component="div" disablePadding>
            {children}
          </List>
        </Collapse>
      )}
    </li>
  );
};

export default Category;

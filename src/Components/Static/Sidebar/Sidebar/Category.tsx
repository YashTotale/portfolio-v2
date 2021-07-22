// React Imports
import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { LocationDescriptor } from "history";
import { generateSidebarPath } from "./Contents";

// Material UI Imports
import {
  List,
  makeStyles,
  ListItem,
  ListItemText,
  Collapse,
  Theme,
} from "@material-ui/core";
import { ExpandLess } from "@material-ui/icons";

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
}

const Category: FC<CategoryProps> = ({ label, to, children }) => {
  const pathname = useLocation().pathname;
  const curr = typeof to === "string" ? to : to.pathname ?? "";
  const open = pathname.includes(curr);
  const classes = useStyles({ open, isActive: pathname === curr });

  return (
    <li className={classes.listItemContainer}>
      <Link
        to={pathname === curr && children ? generateSidebarPath("/") : to}
        className={classes.link}
      >
        <ListItem button className={classes.listItem}>
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

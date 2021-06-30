// React Imports
import React, { FC } from "react";
import { useHistory, useLocation } from "react-router";
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
  const history = useHistory();

  return (
    <li className={classes.listItemContainer}>
      <ListItem
        button
        className={classes.listItem}
        onClick={() => {
          if (pathname === curr && children)
            history.push(generateSidebarPath("/"));
          else history.push(to);
        }}
      >
        <ListItemText
          primary={label}
          classes={{
            primary: classes.listItemText,
          }}
        />
        {children && <ExpandLess className={classes.arrow} />}
      </ListItem>
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

// React Imports
import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { LocationDescriptor } from "history";

// Material UI Imports
import { ListItem, ListItemText, makeStyles, Theme } from "@material-ui/core";

interface StyleProps {
  isActive: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  link: {
    color: theme.palette.text.primary,
    textDecoration: "none",
  },
  listItem: {
    padding: theme.spacing(0.75, 1),
    paddingLeft: theme.spacing(5),
  },
  listItemText: {
    fontSize: theme.typography.body2.fontSize,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    color: ({ isActive }) =>
      isActive ? theme.palette.primary.main : theme.palette.text.primary,
  },
}));

interface ItemProps {
  label: string;
  to: LocationDescriptor;
}

const Item: FC<ItemProps> = ({ label, to }) => {
  const pathname = useLocation().pathname;
  const classes = useStyles({
    isActive: pathname === (typeof to === "string" ? to : to.pathname),
  });

  return (
    <Link to={to} className={classes.link}>
      <ListItem button className={classes.listItem}>
        <ListItemText
          primary={label}
          classes={{
            primary: classes.listItemText,
          }}
        />
      </ListItem>
    </Link>
  );
};

export default Item;

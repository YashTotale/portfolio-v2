// React Imports
import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { LocationDescriptor } from "history";

// Material UI Imports
import { ListItem, ListItemText, Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

interface StyleProps {
  isActive: boolean;
  isHighlighted: boolean;
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
    fontWeight: ({ isActive, isHighlighted }) =>
      isActive || isHighlighted
        ? theme.typography.fontWeightBold
        : theme.typography.fontWeightRegular,
    color: ({ isActive, isHighlighted }) =>
      isActive
        ? theme.palette.primary.main
        : isHighlighted
        ? theme.palette.secondary.main
        : theme.palette.text.primary,
  },
}));

interface ItemProps {
  label: string;
  highlighted?: boolean;
  secondary?: string;
  to: LocationDescriptor;
}

const Item: FC<ItemProps> = (props) => {
  const { label, highlighted = false, secondary, to } = props;

  const pathname = useLocation().pathname;
  const curr = typeof to === "string" ? to : to.pathname;

  const classes = useStyles({
    isActive: pathname === curr,
    isHighlighted: highlighted,
  });

  return (
    <Link to={to} className={classes.link}>
      <ListItem button className={classes.listItem}>
        <ListItemText
          primary={label}
          secondary={secondary}
          classes={{
            primary: classes.listItemText,
          }}
        />
      </ListItem>
    </Link>
  );
};

export default Item;

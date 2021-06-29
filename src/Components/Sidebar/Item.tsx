// React Imports
import React, { FC } from "react";
import { useHistory, useLocation } from "react-router";

// Material UI Imports
import { ListItem, ListItemText, makeStyles, Theme } from "@material-ui/core";

interface StyleProps {
  isActive: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
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
  to: string;
}

const Item: FC<ItemProps> = ({ label, to }) => {
  const pathname = useLocation().pathname;
  const history = useHistory();
  const classes = useStyles({
    isActive: pathname === to,
  });

  return (
    <ListItem
      button
      className={classes.listItem}
      onClick={() => {
        history.push(to);
      }}
    >
      <ListItemText
        primary={label}
        classes={{
          primary: classes.listItemText,
        }}
      />
    </ListItem>
  );
};

export default Item;

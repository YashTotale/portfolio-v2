// React Imports
import React, { FC } from "react";
import { useHistory } from "react-router";

// Material UI Imports
import { ListItem, ListItemText, makeStyles } from "@material-ui/core";

interface ItemProps {
  label: string;
  to: string;
}

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(0.75, 1),
    paddingLeft: theme.spacing(5),
  },
}));

const Item: FC<ItemProps> = ({ label, to }) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <ListItem
      button
      className={classes.listItem}
      onClick={() => history.push(to)}
    >
      <ListItemText primary={label} />
    </ListItem>
  );
};

export default Item;

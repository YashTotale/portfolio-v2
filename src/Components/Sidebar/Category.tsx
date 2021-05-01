// React Imports
import React, { FC, useState } from "react";
import { useHistory } from "react-router";

// Material UI Imports
import {
  List,
  makeStyles,
  ListItem,
  ListItemText,
  Collapse,
  CircularProgress,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  listItemContainer: {
    padding: theme.spacing(0),
  },
  listItemRoot: {
    padding: theme.spacing(0.75, 1),
    paddingLeft: theme.spacing(3),
  },
  listItemTextRoot: {
    fontWeight: theme.typography.fontWeightBold,
  },
  spinner: {
    marginRight: theme.spacing(1),
  },
}));

interface CategoryProps {
  to: string;
  label: string;
}

const Category: FC<CategoryProps> = ({ label, to, children }) => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  return (
    <li className={classes.listItemContainer}>
      <ListItem
        button
        disabled={children === null}
        className={classes.listItemRoot}
        onClick={() => {
          if (!open) history.push(to);
          setOpen(!open);
        }}
      >
        <ListItemText
          primary={label}
          classes={{
            primary: classes.listItemTextRoot,
          }}
        />
        {children === null && (
          <CircularProgress size={24} className={classes.spinner} />
        )}
      </ListItem>
      {children !== null && (
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

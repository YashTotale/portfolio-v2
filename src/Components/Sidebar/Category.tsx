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
  withChildren?: boolean;
}

const Category: FC<CategoryProps> = ({
  label,
  to,
  withChildren = true,
  children,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const childrenLoading = withChildren && children === null;
  const childrenReady = withChildren && children !== null;

  return (
    <li className={classes.listItemContainer}>
      <ListItem
        button
        disabled={childrenLoading}
        className={classes.listItemRoot}
        onClick={() => {
          if (!open) history.push(to);
          if (withChildren) setOpen(!open);
        }}
      >
        <ListItemText
          primary={label}
          classes={{
            primary: classes.listItemTextRoot,
          }}
        />
        {childrenLoading && (
          <CircularProgress size={24} className={classes.spinner} />
        )}
      </ListItem>
      {childrenReady && (
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

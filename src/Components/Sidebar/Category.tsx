// React Imports
import React, { FC } from "react";
import { useHistory, useLocation } from "react-router";

// Material UI Imports
import {
  List,
  makeStyles,
  ListItem,
  ListItemText,
  Collapse,
  CircularProgress,
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
  listItemRoot: {
    padding: theme.spacing(0.75, 1),
    paddingLeft: theme.spacing(3),
  },
  listItemTextRoot: {
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
  const pathname = useLocation().pathname;
  const open = pathname.includes(to);
  const classes = useStyles({ open, isActive: pathname === to });
  const history = useHistory();

  const childrenLoading = withChildren && children === null;
  const childrenReady = withChildren && children !== null;

  return (
    <li className={classes.listItemContainer}>
      <ListItem
        button
        disabled={childrenLoading}
        className={classes.listItemRoot}
        onClick={() => {
          if (open && withChildren) history.push("/");
          else history.push(to);
        }}
      >
        <ListItemText
          primary={label}
          classes={{
            primary: classes.listItemTextRoot,
          }}
        />
        {childrenLoading && <CircularProgress size={24} />}
        {childrenReady && <ExpandLess className={classes.arrow} />}
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

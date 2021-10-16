// React Imports
import React, { FC } from "react";

// Material UI Imports
import {
  makeStyles,
  Switch,
  SwitchProps,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: theme.spacing(1, 6.5),

    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(0.5, 3, 1, 6),
    },
  },
  label: {
    flexGrow: 1,
  },
}));

interface ItemProps {
  label: string;
  action: JSX.Element;
}

const Item: FC<ItemProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <div className={classes.item}>
      <Typography
        variant={isSizeXS ? "body2" : "body1"}
        color="textSecondary"
        className={classes.label}
      >
        {props.label}
      </Typography>
      {props.action}
    </div>
  );
};

type SwitchItemProps = Omit<ItemProps, "action"> & {
  checked: boolean;
  onChange: () => void;
  color?: SwitchProps["color"];
};

export const SwitchItem: FC<SwitchItemProps> = (props) => {
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <Item
      {...props}
      action={
        <Switch
          checked={props.checked}
          onChange={props.onChange}
          color={props.color ?? "primary"}
          size={isSizeXS ? "small" : "medium"}
        />
      }
    />
  );
};

export default Item;

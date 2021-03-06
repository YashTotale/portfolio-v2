// React Imports
import React, { FC } from "react";

// Material UI Imports
import {
  MenuItem,
  MenuItemProps,
  Select,
  Switch,
  SwitchProps,
  TextField,
  TextFieldProps,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: theme.spacing(0.75, 6.5, 0.75, 0),

    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(0.5, 3, 0.75, 0),
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

type ExtendItem = Omit<ItemProps, "action">;

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

type SwitchItemProps = ExtendItem & {
  checked: boolean;
  onChange: (checked: boolean) => void;
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
          onChange={(e, checked) => props.onChange(checked)}
          color={props.color ?? "primary"}
          size={isSizeXS ? "small" : "medium"}
        />
      }
    />
  );
};

type SelectItemProps<T extends MenuItemProps["value"]> = ExtendItem & {
  value: T;
  values: T[] | readonly T[];
  onChange: (value: T) => void;
  defaultValue?: T;
};

export const SelectItem = <T extends MenuItemProps["value"]>(
  props: SelectItemProps<T>
): JSX.Element => (
  <Item
    {...props}
    action={
      <Select
        defaultValue={props.defaultValue}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value as T)}
        size="small"
      >
        {props.values.map((val: T, i: number) => (
          <MenuItem key={i} value={val}>
            {val}
          </MenuItem>
        ))}
      </Select>
    }
  />
);

type InputItemProps<T extends any> = ExtendItem & {
  value: T;
  onChange: (value: T) => void;
  type?: TextFieldProps["type"];
};

export const InputItem = <T extends any>(
  props: InputItemProps<T>
): JSX.Element => {
  return (
    <Item
      {...props}
      action={
        <TextField
          value={props.value}
          onChange={(e) => props.onChange(e.target.value as T)}
          type={props.type}
        />
      }
    />
  );
};

export default Item;

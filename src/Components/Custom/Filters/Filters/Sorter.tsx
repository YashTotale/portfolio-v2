// React Imports
import React, { FC } from "react";
import clsx from "clsx";
import { Filter } from "./index";

// Material UI Imports
import {
  FormControl,
  makeStyles,
  MenuItem,
  Select,
  InputLabel,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Replay } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  itemSelected: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export interface SorterProps {
  value: string;
  values: string[] | readonly string[];
  onChange: (value: string) => void;
}

const Sorter: FC<SorterProps> = ({ value, values, onChange }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <Filter
      label="Sort"
      actions={[
        {
          label: "Reset",
          icon: <Replay />,
          action: () => onChange(values[0]),
          disabled: value === values[0],
        },
      ]}
    >
      <FormControl>
        {isSizeXS && <InputLabel>Sort</InputLabel>}
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value as string)}
        >
          {values.map((v: string, i: number) => (
            <MenuItem
              key={i}
              value={v}
              className={clsx({
                [classes.itemSelected]: value === v,
              })}
            >
              {v}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Filter>
  );
};

export default Sorter;

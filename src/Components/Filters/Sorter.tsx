// React Imports
import React, { FC } from "react";
import clsx from "clsx";
import { Filter } from "./index";

// Material UI Imports
import { FormControl, makeStyles, MenuItem, Select } from "@material-ui/core";
import { Replay } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  itemSelected: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export interface SorterProps {
  value: string;
  values: string[];
  onChange: (value: string) => void;
}

const Sorter: FC<SorterProps> = ({ value, values, onChange }) => {
  const classes = useStyles();

  return (
    <Filter
      label="Sort"
      actions={[
        {
          label: "Reset",
          icon: <Replay />,
          action: () => onChange(values[0]),
        },
      ]}
    >
      <FormControl>
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value as string)}
        >
          {values.map((v, i) => (
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

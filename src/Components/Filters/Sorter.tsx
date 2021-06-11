// React Imports
import React, { FC } from "react";
import { Filter } from "./index";

// Material UI Imports
import { FormControl, makeStyles, MenuItem, Select } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {},
}));

export interface SorterProps {
  value: string;
  values: string[];
  onChange: (value: string) => void;
}

const Sorter: FC<SorterProps> = ({ value, values, onChange }) => {
  const classes = useStyles();

  return (
    <Filter label="Sort">
      <FormControl className={classes.container}>
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value as string)}
        >
          {values.map((value, i) => (
            <MenuItem key={i} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Filter>
  );
};

export default Sorter;

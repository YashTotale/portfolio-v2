// React Imports
import React, { FC } from "react";

// Material UI Imports
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.only("xl")]: {
      width: "40%",
    },

    [theme.breakpoints.only("lg")]: {
      width: "40%",
    },

    [theme.breakpoints.only("md")]: {
      width: "50%",
    },

    [theme.breakpoints.only("sm")]: {
      height: theme.spacing(5),
      width: "75%",
    },

    [theme.breakpoints.only("xs")]: {
      height: theme.spacing(5),
      width: "100%",
    },
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
    <FormControl className={classes.container}>
      <InputLabel>Sort by</InputLabel>
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
  );
};

export default Sorter;

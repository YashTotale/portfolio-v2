// React Imports
import React, { FC, useState } from "react";
import debounce from "lodash.debounce";

// Material UI Imports
import { Input, makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    height: theme.spacing(6),

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
  container: {
    margin: "auto 16px",
    width: "100%",
  },
  input: {
    width: "100%",
  },
}));

interface SearchBarProps {
  defaultSearch: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ defaultSearch, onSearchChange }) => {
  const classes = useStyles();
  const [localSearch, setLocalSearch] = useState(defaultSearch);

  const handleChange = debounce((value: string) => {
    onSearchChange(value);
  }, 500);

  return (
    <Paper className={classes.root} elevation={4}>
      <div className={classes.container}>
        <Input
          value={localSearch}
          onChange={(e) => {
            const val = e.target.value;

            setLocalSearch(val);
            handleChange(val);
          }}
          placeholder="Search..."
          fullWidth
          className={classes.input}
          disableUnderline
        />
      </div>
    </Paper>
  );
};

export default SearchBar;

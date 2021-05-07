// React Imports
import React, { FC, useState } from "react";

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
    width: `calc(100% - ${theme.spacing(6 + 4)}px)`,
  },
  input: {
    width: "100%",
  },
}));

interface SearchBarProps {
  onChange: (search: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onChange }) => {
  const classes = useStyles();
  const [search, setSearch] = useState("");

  const handleChange = (value: string) => {
    setSearch(value);
    onChange(value);
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.container}>
        <Input
          value={search}
          onChange={(e) => handleChange(e.target.value)}
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

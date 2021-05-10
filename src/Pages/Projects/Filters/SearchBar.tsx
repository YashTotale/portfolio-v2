// React Imports
import React, { FC, useState } from "react";
import { debounce } from "lodash";

// Redux Imports
import { useSelector } from "react-redux";
import { getProjectsSearch, setProjectsSearch } from "../../../Redux";
import { useAppDispatch } from "../../../Store";

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

const SearchBar: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const globalSearch = useSelector(getProjectsSearch);
  const [localSearch, setLocalSearch] = useState(globalSearch);

  const handleChange = debounce((value: string) => {
    dispatch(setProjectsSearch(value));
  }, 500);

  return (
    <Paper className={classes.root}>
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

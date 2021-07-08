// React Imports
import React, { FC } from "react";
import { useClosableSnackbar } from "../../../../../Hooks";
import MatchHighlight from "../../../../Atomic/MatchHighlight";
import { ResolvedTag } from "../../../../../Utils/types";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getTagsCategoryFilter,
  setTagsCategoryFilter,
} from "../../../../../Redux";
import { useAppDispatch } from "../../../../../Store";

// Material UI Imports
import { Chip, makeStyles, Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  categories: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1, 0),
  },
  category: {
    margin: theme.spacing(0.5),
  },
}));

type CategoriesProps = ResolvedTag & {
  search?: string;
};

const Categories: FC<CategoriesProps> = (props) => {
  const classes = useStyles();

  if (!props.categories) return null;

  return (
    <div className={classes.categories}>
      {props.categories.map((category, i) => (
        <Category key={i} category={category} search={props.search} />
      ))}
    </div>
  );
};

interface CategoryProps {
  category: string;
  search?: string;
}

const Category: FC<CategoryProps> = (props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useClosableSnackbar();
  const categoryFilter = useSelector(getTagsCategoryFilter);

  const alreadyFiltered =
    categoryFilter.length === 1 && categoryFilter[0] === props.category;

  const onFilter = () => {
    dispatch(setTagsCategoryFilter([props.category]));
    enqueueSnackbar(`Filtered Tags by ${props.category}`, {
      variant: "success",
    });
  };

  const onUnfilter = () => {
    dispatch(setTagsCategoryFilter([]));
    enqueueSnackbar(`Removed ${props.category} filter`, {
      variant: "success",
    });
  };

  return (
    <Tooltip
      title={
        alreadyFiltered
          ? `Remove ${props.category} filter`
          : `Filter by ${props.category}`
      }
    >
      <Chip
        label={
          <MatchHighlight toMatch={props.search}>
            {props.category}
          </MatchHighlight>
        }
        onClick={alreadyFiltered ? onUnfilter : onFilter}
        className={classes.category}
      />
    </Tooltip>
  );
};

export default Categories;

// React Imports
import React, { FC } from "react";
import { useClosableSnackbar } from "../../../../Hooks";
import MatchHighlight from "../../../Atomic/MatchHighlight";
import { ResolvedTag } from "../../../../Utils/types";
import { scrollToTop } from "../../../../Utils/funcs";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getTagsCategoryFilter,
  setTagsCategoryFilter,
} from "../../../../Redux";
import { useAppDispatch } from "../../../../Store";

// Material UI Imports
import { Chip, Theme, Tooltip } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

interface StyleProps {
  paddingX: number;
  paddingY: number;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  categories: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: ({ paddingX, paddingY }) => theme.spacing(paddingY, paddingX),
  },
}));

type CategoriesProps = ResolvedTag & {
  search?: string;
  withClick?: boolean;
  paddingX?: number;
  paddingY?: number;
};

const Categories: FC<CategoriesProps> = (props) => {
  const classes = useStyles({
    paddingX: props.paddingX ?? 0,
    paddingY: props.paddingY ?? 0,
  });

  if (!props.categories) return null;

  return (
    <div className={classes.categories}>
      {props.categories.map((category, i) => (
        <Category
          key={i}
          category={category}
          search={props.search}
          withClick={props.withClick}
        />
      ))}
    </div>
  );
};

const useCategoryStyles = makeStyles((theme) => ({
  category: {
    margin: theme.spacing(0.5),
  },
}));

interface CategoryProps {
  category: string;
  search?: string;
  withClick?: boolean;
}

const Category: FC<CategoryProps> = (props) => {
  const classes = useCategoryStyles();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useClosableSnackbar();

  const categoryFilter = useSelector(getTagsCategoryFilter);
  const alreadyFiltered = categoryFilter.includes(props.category);

  const onClick = () => {
    const currentFilter = categoryFilter;
    scrollToTop();
    dispatch(
      setTagsCategoryFilter(
        alreadyFiltered
          ? categoryFilter.filter((c) => c !== props.category)
          : [...categoryFilter, props.category]
      )
    );
    enqueueSnackbar(
      alreadyFiltered
        ? `Removed '${props.category}' Filter`
        : `Filtered Tags by '${props.category}'`,
      {
        variant: "success",
        onUndo: () => {
          dispatch(setTagsCategoryFilter(currentFilter));
          enqueueSnackbar(
            `Reverted to Previous Category Filter (${
              currentFilter.length ? currentFilter.join(", ") : "None"
            })`,
            {
              variant: "success",
            }
          );
        },
      }
    );
  };

  const chip = (
    <Chip
      label={
        <MatchHighlight toMatch={props.search}>{props.category}</MatchHighlight>
      }
      onClick={props.withClick ? onClick : undefined}
      color={alreadyFiltered ? "primary" : "default"}
      className={classes.category}
    />
  );

  if (!props.withClick) return chip;

  return (
    <Tooltip
      title={
        alreadyFiltered
          ? `Remove '${props.category}' Filter`
          : `Filter Tags by '${props.category}'`
      }
    >
      {chip}
    </Tooltip>
  );
};

export default Categories;

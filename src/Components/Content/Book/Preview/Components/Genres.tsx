// React Imports
import React, { FC } from "react";
import { Item } from "./Info";
import { useClosableSnackbar } from "../../../../../Hooks";
import { Book } from "../../../../../Utils/types";
import MatchHighlight from "../../../../Atomic/MatchHighlight";
import { scrollToTop } from "../../../../../Utils/funcs";

// Redux Imports
import { useSelector } from "react-redux";
import { getBooksGenreFilter, setBooksGenreFilter } from "../../../../../Redux";
import { useAppDispatch } from "../../../../../Store";

// Material UI Imports
import { Chip, Tooltip } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

type GenresProps = Book & {
  search?: string;
};

const Genres: FC<GenresProps> = (props) => {
  if (!props.genres) return null;

  return (
    <Item label="Genres">
      {props.genres.map((genre) => (
        <Genre key={genre} genre={genre} search={props.search} />
      ))}
    </Item>
  );
};

const useStyles = makeStyles((theme) => ({
  genre: {
    margin: theme.spacing(0.25),
  },
}));

interface GenreProps {
  genre: string;
  search?: string;
}

const Genre: FC<GenreProps> = (props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useClosableSnackbar();

  const genreFilter = useSelector(getBooksGenreFilter);
  const alreadyFiltered = genreFilter.includes(props.genre);

  const onClick = () => {
    const currentFilter = genreFilter;
    scrollToTop();
    dispatch(
      setBooksGenreFilter(
        alreadyFiltered
          ? genreFilter.filter((g) => g !== props.genre)
          : [...genreFilter, props.genre]
      )
    );
    enqueueSnackbar(
      alreadyFiltered
        ? `Removed '${props.genre}' Filter`
        : `Filtered Books by '${props.genre}'`,
      {
        variant: "success",
        onUndo: () => {
          dispatch(setBooksGenreFilter(currentFilter));
          enqueueSnackbar(
            `Reverted to Previous Genre Filter (${
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

  return (
    <Tooltip
      title={
        alreadyFiltered
          ? `Remove '${props.genre}' Filter`
          : `Filter Books by '${props.genre}'`
      }
    >
      <Chip
        label={
          <MatchHighlight toMatch={props.search}>{props.genre}</MatchHighlight>
        }
        onClick={onClick}
        size="small"
        color={alreadyFiltered ? "primary" : "default"}
        className={classes.genre}
      />
    </Tooltip>
  );
};

export default Genres;

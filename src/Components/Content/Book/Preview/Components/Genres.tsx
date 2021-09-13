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
import { Chip, Tooltip, makeStyles } from "@material-ui/core";

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
  const alreadyFiltered =
    genreFilter.length === 1 && genreFilter[0] === props.genre;

  const onFilter = () => {
    scrollToTop();
    dispatch(setBooksGenreFilter([props.genre]));
    enqueueSnackbar(`Filtered Books by ${props.genre}`, {
      variant: "success",
    });
  };

  const onUnfilter = () => {
    scrollToTop();
    dispatch(setBooksGenreFilter([]));
    enqueueSnackbar(`Removed ${props.genre} filter`, {
      variant: "success",
    });
  };

  return (
    <Tooltip
      title={
        alreadyFiltered
          ? `Remove ${props.genre} filter`
          : `Filter by ${props.genre}`
      }
    >
      <Chip
        label={
          <MatchHighlight toMatch={props.search}>{props.genre}</MatchHighlight>
        }
        onClick={alreadyFiltered ? onUnfilter : onFilter}
        size="small"
        color={alreadyFiltered ? "primary" : "default"}
        className={classes.genre}
      />
    </Tooltip>
  );
};

export default Genres;

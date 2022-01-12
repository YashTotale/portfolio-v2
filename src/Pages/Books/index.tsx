// React Imports
import React, { FC, useState } from "react";
import { Helmet } from "react-helmet";
import { useAnalytics } from "../../Hooks";
import Filters from "../../Components/Custom/Filters";
import BookPreview from "../../Components/Content/Book/Preview";
import HorizontalDivider from "../../Components/Atomic/Divider/Horizontal";
import { generatePageTitle } from "../../Utils/funcs";
import {
  getBookAuthors,
  getBookGenres,
  getBookYearsRead,
  getBookCenturies,
  useFilteredBooks,
} from "../../Utils/Content/books";
import { Book } from "../../Utils/types";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getBooksAuthorFilter,
  getBooksGenreFilter,
  getBooksSearch,
  getBooksSort,
  setBooksAuthorFilter,
  setBooksGenreFilter,
  getBooksYearFilter,
  setBooksYearFilter,
  getBooksCenturyFilter,
  setBooksCenturyFilter,
  setBooksSearch,
  setBooksSort,
} from "../../Redux";
import { BookSort, BOOKS_SORT } from "../../Redux/books.slice";
import { useAppDispatch } from "../../Store";

// Material UI Imports
import { Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  books: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    columnGap: theme.spacing(4),
    rowGap: theme.spacing(4),
    width: "100%",
    margin: theme.spacing(2, 0),

    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr",
    },
  },
  sectionDivider: {
    margin: theme.spacing(1, 0),
  },
  showMoreBtn: {
    marginTop: theme.spacing(2.5),
  },
}));

interface Shelf {
  id: string;
  label: string;
}

const SHELVES: Shelf[] = [
  {
    id: "currently-reading",
    label: "Currently Reading",
  },
  {
    id: "to-read",
    label: "Want to Read",
  },
  {
    id: "read",
    label: "Read",
  },
];

const Books: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const books = useFilteredBooks();
  const genres = getBookGenres();
  const authors = getBookAuthors();
  const centuries = getBookCenturies();
  const yearsRead = getBookYearsRead();

  const search = useSelector(getBooksSearch);
  const sort = useSelector(getBooksSort);
  const genreFilter = useSelector(getBooksGenreFilter);
  const authorFilter = useSelector(getBooksAuthorFilter);
  const centuryFilter = useSelector(getBooksCenturyFilter);
  const yearFilter = useSelector(getBooksYearFilter);

  useAnalytics("Books");

  return (
    <>
      <Helmet>
        <title>{generatePageTitle("Books")}</title>
      </Helmet>
      <div className={classes.container}>
        <Filters
          search={{
            defaultSearch: search,
            onSearchChange: (value) => dispatch(setBooksSearch(value)),
          }}
          sort={{
            value: sort,
            values: BOOKS_SORT,
            onChange: (value) => dispatch(setBooksSort(value as BookSort)),
          }}
          related={[
            {
              label: "Author",
              values: authors,
              value: authorFilter,
              overrideDefaultLabel: true,
              onChange: (value: Parameters<typeof setBooksAuthorFilter>[0]) =>
                dispatch(setBooksAuthorFilter(value)),
            },
            {
              label: "Genres",
              values: genres,
              value: genreFilter,
              onChange: (value: Parameters<typeof setBooksGenreFilter>[0]) =>
                dispatch(setBooksGenreFilter(value)),
            },
            {
              label: "Century Published",
              values: centuries,
              value: centuryFilter,
              overrideDefaultLabel: true,
              onChange: (value: Parameters<typeof setBooksCenturyFilter>[0]) =>
                dispatch(setBooksCenturyFilter(value)),
            },
            {
              label: "Year Read",
              values: yearsRead,
              value: yearFilter,
              overrideDefaultLabel: true,
              onChange: (value: Parameters<typeof setBooksYearFilter>[0]) =>
                dispatch(setBooksYearFilter(value)),
            },
          ]}
        />
        {books.length ? (
          SHELVES.map((shelf) => (
            <Section
              key={shelf.id}
              label={shelf.label}
              books={books.filter((book) => book.shelves.includes(shelf.id))}
            />
          ))
        ) : (
          <Typography variant="h6">No books found</Typography>
        )}
      </div>
    </>
  );
};

const BOOK_INTERVAL = 10;

interface SectionProps {
  books: Book[];
  label: string;
}

const Section: FC<SectionProps> = ({ books, label }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));
  const [numShowMore, setShowMore] = useState(0);

  const search = useSelector(getBooksSearch);

  if (!books.length) return null;

  const defaultShown = books.slice(0, BOOK_INTERVAL);
  const extra = books.slice(BOOK_INTERVAL, BOOK_INTERVAL + numShowMore);
  const isShowingAll = defaultShown.length + extra.length === books.length;

  return (
    <>
      <HorizontalDivider className={classes.sectionDivider} />
      <div className={classes.section}>
        <Typography variant={isSizeXS ? "h5" : "h4"}>{label}</Typography>
        <div className={classes.books}>
          {defaultShown.map((book) => (
            <BookPreview key={book.id} id={book.id} search={search} />
          ))}
          {extra.map((book) => (
            <BookPreview key={book.id} id={book.id} search={search} />
          ))}
        </div>
      </div>
      {defaultShown.length !== books.length && (
        <Button
          variant="contained"
          color="secondary"
          onClick={() =>
            setShowMore(isShowingAll ? 0 : BOOK_INTERVAL + numShowMore)
          }
          className={classes.showMoreBtn}
        >
          Show {isShowingAll ? "Less" : "More"}
          {isShowingAll ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </Button>
      )}
    </>
  );
};

export default Books;

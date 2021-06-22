// React Imports
import React, { FC } from "react";
import Filters from "../../Components/Filters";
import BookPreview from "../../Components/Book/Preview";
import HorizontalDivider from "../../Components/Divider/Horizontal";
import { useFilteredBooks } from "../../Utils/Content/books";
import { Book } from "../../Utils/types";

// Redux Imports
import { useSelector } from "react-redux";
import { getBooksSearch, setBooksSearch } from "../../Redux";
import { useAppDispatch } from "../../Store";

// Material UI Imports
import {
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

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
    alignItems: "flex-start",
    width: "100%",

    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
    },
  },
  books: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "stretch",
    flexWrap: "wrap",
    width: "100%",
    marginLeft: theme.spacing(-2),

    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      marginLeft: 0,
    },
  },
  sectionDivider: {
    margin: theme.spacing(1, 0),
  },
}));

const Books: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const search = useSelector(getBooksSearch);
  const books = useFilteredBooks();

  return (
    <div className={classes.container}>
      <Filters
        search={{
          defaultSearch: search,
          onSearchChange: (value) => dispatch(setBooksSearch(value)),
        }}
      />
      {books.length ? (
        <>
          <Section
            books={books}
            shelf="currently-reading"
            label="Currently Reading"
          />
          <Section books={books} shelf="to-read" label="Want to Read" />
          <Section books={books} shelf="read" label="Read" />{" "}
        </>
      ) : (
        <Typography variant="h6">No books found</Typography>
      )}
    </div>
  );
};

interface SectionProps {
  books: Book[];
  shelf: string;
  label: string;
}

const Section: FC<SectionProps> = ({ books, shelf, label }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  const search = useSelector(getBooksSearch);
  const included = books.filter((book) => book.shelves.includes(shelf));

  if (!included.length) return null;

  return (
    <>
      <HorizontalDivider className={classes.sectionDivider} />
      <div className={classes.section}>
        <Typography variant={isSizeXS ? "h5" : "h4"}>{label}</Typography>
        <div className={classes.books}>
          {included.map((book) => (
            <BookPreview key={book.id} id={book.id} search={search} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Books;

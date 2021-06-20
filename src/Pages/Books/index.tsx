// React Imports
import React, { FC } from "react";
import Filters from "../../Components/Filters";
import BookPreview from "../../Components/Book/Preview";
import HorizontalDivider from "../../Components/Divider/Horizontal";
import { getBooks } from "../../Utils/Content/books";

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

  return (
    <div className={classes.container}>
      <Filters
        search={{
          defaultSearch: search,
          onSearchChange: (value) => dispatch(setBooksSearch(value)),
        }}
      />
      <Section shelf="currently-reading" label="Currently Reading" />
      <Section shelf="to-read" label="Want to Read" />
      <Section shelf="read" label="Read" />
    </div>
  );
};

interface SectionProps {
  shelf: string;
  label: string;
}

const Section: FC<SectionProps> = ({ shelf, label }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  const books = getBooks();
  const included = books.filter((book) => book.shelves.includes(shelf));

  if (!included.length) return null;

  return (
    <>
      <HorizontalDivider className={classes.sectionDivider} />
      <div className={classes.section}>
        <Typography variant={isSizeXS ? "h5" : "h4"}>{label}</Typography>
        <div className={classes.books}>
          {included.map((book) => (
            <BookPreview key={book.id} id={book.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Books;

// React Imports
import React, { FC } from "react";
import BookPreview from "../../Components/Book/Preview";
import { getBooks } from "../../Utils/Content/books";

// Material UI Imports
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    flexWrap: "wrap",
    width: "100%",
  },
}));

const Books: FC = () => {
  const classes = useStyles();
  const books = getBooks();

  return (
    <div className={classes.container}>
      {books.map((book) => (
        <BookPreview key={book.id} id={book.id} />
      ))}
    </div>
  );
};

export default Books;

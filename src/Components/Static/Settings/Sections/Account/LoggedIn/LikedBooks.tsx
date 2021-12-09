// React Imports
import React, { FC } from "react";
import { ProfileProps } from "./index";
import Subsection from "../../../Subsection";
import { Paths } from "../../../../NavController";
import Mini from "../../../../../Content/Book/Mini";
import StyledLink from "../../../../../Atomic/StyledLink";
import ResponsiveIcon from "../../../../../Atomic/Icon/Responsive";
import { getRawBook } from "../../../../../../Utils/Content/books";
import { Book } from "../../../../../../Utils/types";

// Firebase Imports
import { useBooksLikedByUserOnce } from "../../../../../../Controllers/books.controller";

// Redux Imports
import { changePopupState } from "../../../../../../Redux";
import { PopupType } from "../../../../../../Redux/display.slice";
import { useAppDispatch } from "../../../../../../Store";

// Material UI Imports
import { Tooltip, Typography } from "@mui/material";
import { Book as BookIcon, Download } from "@mui/icons-material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "stretch",
    width: "100%",
    flexWrap: "wrap",
    marginLeft: theme.spacing(-1.5),

    [theme.breakpoints.only("xs")]: {
      marginLeft: theme.spacing(-1),
    },
  },
  noneLiked: {
    margin: theme.spacing(1),
    marginLeft: 0,
  },
}));

const LikedBooks: FC<ProfileProps> = (props) => {
  const classes = useStyles();
  const likedBooks = useBooksLikedByUserOnce(props.user.uid);

  return (
    <Subsection
      title={<StyledLink to={Paths.Books}>Liked Books</StyledLink>}
      icon={<BookIcon />}
      rightAction={
        likedBooks.length ? (
          <Export likedBooks={likedBooks.map((book) => book.id)} />
        ) : undefined
      }
    >
      {likedBooks.length ? (
        <div className={classes.container}>
          {likedBooks.map((book) => (
            <Mini key={book.id} id={book.id} />
          ))}
        </div>
      ) : (
        <Typography className={classes.noneLiked}>
          You have not liked any books yet.{" "}
          <StyledLink to={Paths.Books}>Go like some!</StyledLink>
        </Typography>
      )}
    </Subsection>
  );
};

interface ExportProps {
  likedBooks: string[];
}

const Export: FC<ExportProps> = (props) => {
  const dispatch = useAppDispatch();

  const onExport = async () => {
    const books = props.likedBooks.reduce((arr, id) => {
      const book = getRawBook(id) as Partial<Book>;
      if (!book) return arr;

      const formattedBook = { ...book };
      delete formattedBook.datesRead;
      delete formattedBook.shelves;
      delete formattedBook.rating;

      return [...arr, formattedBook];
    }, [] as Partial<Book>[]);

    dispatch(
      changePopupState({
        type: PopupType.EXPORT_DATA,
        state: {
          label: "Liked Books",
          fileName: "liked_books",
          data: books,
        },
      })
    );
  };

  return (
    <Tooltip title="Export">
      <ResponsiveIcon onClick={onExport}>
        <Download />
      </ResponsiveIcon>
    </Tooltip>
  );
};

export default LikedBooks;

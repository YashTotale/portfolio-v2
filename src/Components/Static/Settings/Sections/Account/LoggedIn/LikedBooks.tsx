// React Imports
import React, { FC, forwardRef, useState } from "react";
import { TransitionGroup } from "react-transition-group";
import { ProfileProps } from "./index";
import Subsection from "../../../Subsection";
import { Paths } from "../../../../NavController";
import Mini from "../../../../../Content/Book/Mini";
import { useClosableSnackbar } from "../../../../../../Hooks";
import StyledLink from "../../../../../Atomic/StyledLink";
import ResponsiveIcon from "../../../../../Atomic/Icon/Responsive";
import { getRawBook } from "../../../../../../Utils/Content/books";
import { Book } from "../../../../../../Utils/types";

// Firebase Imports
import { removeLikedBook } from "../../../../../../Controllers/user.controller";

// Redux Imports
import { changePopupState } from "../../../../../../Redux";
import { PopupType } from "../../../../../../Redux/display.slice";
import { useAppDispatch } from "../../../../../../Store";

// Material UI Imports
import { Grow, IconButton, Theme, Tooltip, Typography } from "@mui/material";
import { Book as BookIcon, CancelSharp, Download } from "@mui/icons-material";
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
  collapse: {
    display: "flex",
    alignItems: "stretch",
  },
  noneLiked: {
    margin: theme.spacing(1),
    marginLeft: 0,
  },
}));

const LikedBooks: FC<ProfileProps> = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useClosableSnackbar();
  const likedBooks = props.userDoc?.likedBooks ?? [];

  const removeLike = async (bookId: string) => {
    try {
      await removeLikedBook(props.user.uid, bookId);
    } catch (e) {
      const message = typeof e === "string" ? e : e.message;
      enqueueSnackbar(message || "An error occurred. Please try again.", {
        variant: "error",
      });
    }
  };

  return (
    <Subsection
      title={<StyledLink to={Paths.Books}>Liked Books</StyledLink>}
      icon={<BookIcon />}
      rightAction={
        likedBooks.length ? <Export likedBooks={likedBooks} /> : undefined
      }
    >
      {likedBooks.length ? (
        <TransitionGroup className={classes.container}>
          {likedBooks.map((book) => (
            <Grow key={book}>
              <LikedBook book={book} removeLike={() => removeLike(book)} />
            </Grow>
          ))}
        </TransitionGroup>
      ) : (
        <Typography className={classes.noneLiked}>
          You have not liked any books yet.{" "}
          <StyledLink to={Paths.Books}>Go like some!</StyledLink>
        </Typography>
      )}
    </Subsection>
  );
};

interface StyleProps {
  hover: boolean;
}

const useLikedBookStyles = makeStyles<Theme, StyleProps>((theme) => ({
  container: {
    display: "flex",
    alignItems: "stretch",
    position: "relative",
    margin: theme.spacing(1, 1.5),

    [theme.breakpoints.only("xs")]: {
      margin: theme.spacing(1),
    },
  },
  remove: {
    visibility: ({ hover }) => (hover ? "visible" : "hidden"),
    opacity: ({ hover }) => (hover ? 1 : 0),
    transition: theme.transitions.create(["visibility", "opacity"], {
      duration: "0.2s",
    }),
    zIndex: 100,
    right: -12,
    top: -12,
    backgroundColor: theme.palette.background.default,
    position: "absolute",
    padding: 0,

    "&:hover": {
      backgroundColor: theme.palette.background.default,
    },
  },
}));

interface LikedBookProps {
  book: string;
  removeLike: () => void;
}

const LikedBook = forwardRef<HTMLDivElement, LikedBookProps>((props, ref) => {
  const [hover, setHover] = useState(false);
  const classes = useLikedBookStyles({ hover });

  return (
    <div
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      ref={ref}
      className={classes.container}
    >
      <IconButton
        size="small"
        onClick={props.removeLike}
        className={classes.remove}
      >
        <CancelSharp />
      </IconButton>
      <Mini id={props.book} />
    </div>
  );
});

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

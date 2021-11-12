// React Imports
import React, { FC, useEffect, useState } from "react";
import { ProfileProps } from "./index";
import Subsection from "../../../Subsection";
import { Paths } from "../../../../NavController";
import Mini from "../../../../../Content/Book/Mini";
import StyledLink from "../../../../../Atomic/StyledLink";

// Firebase Imports
import { BookDoc, WithId } from "../../../../../../../types/firestore";
import { getBooksLikedByUser } from "../../../../../../Controllers/books.controller";

// Material UI Imports
import makeStyles from "@mui/styles/makeStyles";
import { Typography } from "@mui/material";
import { Book } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "stretch",
    width: "100%",
    flexWrap: "wrap",
    marginLeft: theme.spacing(-1.5),

    [theme.breakpoints.only("xs")]: {
      justifyContent: "center",
    },
  },
  noneLiked: {
    margin: theme.spacing(1),
    marginLeft: 0,
  },
}));

const LikedBooks: FC<ProfileProps> = (props) => {
  const classes = useStyles();
  const [likedBooks, setLikedBooks] = useState<WithId<BookDoc>[]>([]);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const books = await getBooksLikedByUser(props.user.uid);
      if (isMounted) setLikedBooks(books);
    })();

    return () => {
      isMounted = false;
    };
  }, [props.user.uid]);

  return (
    <Subsection title="Liked Books" icon={<Book />}>
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

export default LikedBooks;

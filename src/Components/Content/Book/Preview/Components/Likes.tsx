// React Imports
import React, { FC } from "react";
import { Book } from "../../../../../Utils/types";

// Firebase Imports
import {
  addBookLike,
  removeBookLike,
  useBookDoc,
} from "../../../../../Controllers/books.controller";
import { useUser } from "../../../../../Context/UserContext";

// Redux Imports
import { changePopupState } from "../../../../../Redux";
import { PopupState } from "../../../../../Redux/display.slice";
import { useAppDispatch } from "../../../../../Store";

// Material UI Imports
import makeStyles from "@mui/styles/makeStyles";
import {
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    right: theme.spacing(1),

    [theme.breakpoints.only("xs")]: {
      position: "static",
    },
  },
}));

type LikesProps = Book;

const Likes: FC<LikesProps> = (props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));
  const user = useUser();
  const bookDoc = useBookDoc(props.id);

  const isLiked = user && bookDoc?.likes.includes(user.uid);
  const numLikes = bookDoc?.likes?.length ?? 0;

  const onClick = async () => {
    if (user) {
      if (isLiked) {
        await removeBookLike(props.id, user.uid);
      } else {
        await addBookLike(props.id, user.uid);
      }
    } else {
      dispatch(changePopupState(PopupState.SIGN_IN_REQUIRED));
    }
  };

  return (
    <div className={classes.container}>
      <Tooltip title={isLiked ? "Remove Like" : "Like"}>
        <IconButton size="small" onClick={onClick}>
          {isLiked ? (
            <Favorite fontSize={isSizeXS ? "small" : "medium"} />
          ) : (
            <FavoriteBorder fontSize={isSizeXS ? "small" : "medium"} />
          )}
        </IconButton>
      </Tooltip>
      <Typography
        variant={isSizeXS ? "caption" : "body2"}
        color={(theme) => theme.palette.text.secondary}
      >
        {numLikes}
      </Typography>
    </div>
  );
};

export default Likes;

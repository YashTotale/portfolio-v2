// React Imports
import React, { FC } from "react";
import { useClosableSnackbar } from "../../../../../Hooks";
import { Book } from "../../../../../Utils/types";

// Firebase Imports
import { useUserData } from "../../../../../Context/UserContext";
import {
  addLikedBook,
  removeLikedBook,
} from "../../../../../Controllers/user.controller";
import { useBookLikesOnce } from "../../../../../Controllers/books.controller";

// Redux Imports
import { changePopupState } from "../../../../../Redux";
import { PopupType } from "../../../../../Redux/display.slice";
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
  const { enqueueSnackbar } = useClosableSnackbar();
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  const user = useUserData();
  const [numLikes, addLike, removeLike] = useBookLikesOnce(props.id);
  const isLiked = user?.likedBooks.includes(props.id);

  const onClick = async () => {
    if (user) {
      try {
        if (isLiked) {
          await removeLikedBook(user.id, props.id);
          removeLike();
        } else {
          await addLikedBook(user.id, props.id);
          addLike();
        }
      } catch (e) {
        const message = typeof e === "string" ? e : e.message;
        enqueueSnackbar(message || "An error occurred. Please try again.", {
          variant: "error",
        });
      }
    } else {
      dispatch(changePopupState(PopupType.SIGN_IN_REQUIRED));
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

// React Imports
import React, { FC, useEffect, useState } from "react";
import { Book } from "../../../../../Utils/types";

// Firebase Imports
import { useUser } from "../../../../../Context/UserContext";
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
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  const user = useUser();
  const [likes, addLike, removeLike] = useBookLikesOnce(props.id);
  const [isLiked, setIsLiked] = useState(likes.includes(user?.uid as string));

  useEffect(() => {
    if (user?.uid) {
      setIsLiked(likes.includes(user?.uid as string));
    } else {
      setIsLiked(false);
    }
  }, [likes, user?.uid]);

  const onClick = async () => {
    if (user) {
      if (isLiked) {
        await removeLike(user.uid);
      } else {
        await addLike(user.uid);
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
        {likes.length}
      </Typography>
    </div>
  );
};

export default Likes;

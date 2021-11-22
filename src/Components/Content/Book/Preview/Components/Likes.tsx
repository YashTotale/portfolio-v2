// React Imports
import React, { FC, useEffect, useState } from "react";
import { Book } from "../../../../../Utils/types";

// Firebase Imports
import { useSigninCheck } from "reactfire";
import { useBookLikesOnce } from "../../../../../Controllers/books.controller";

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

  const [likes, addLike, removeLike] = useBookLikesOnce(props.id);

  const { status: userStatus, data: userData } = useSigninCheck();
  const [isLiked, setIsLiked] = useState(
    likes.includes(userData?.user?.uid as string)
  );

  useEffect(() => {
    if (userStatus === "success") {
      setIsLiked(likes.includes(userData.user?.uid as string));
    }
  }, [likes, userStatus, userData?.user?.uid]);

  const onClick = async () => {
    if (userStatus === "success" && userData.user) {
      if (isLiked) {
        await removeLike(userData.user.uid);
      } else {
        await addLike(userData.user.uid);
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
        {likes.length}
      </Typography>
    </div>
  );
};

export default Likes;

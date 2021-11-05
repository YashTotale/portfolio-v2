// React Imports
import React, { FC, useState } from "react";
import clsx from "clsx";
import { FieldProps } from "./index";
import { useClosableSnackbar } from "../../../../../../Hooks";

// Firebase Imports
import { uploadUserPicture } from "../../../../../../Controllers/user.controller";
import { validateFileSize } from "../../../../../../Controllers/helpers/storage";

// Material UI Imports
import { Avatar, CircularProgress, Tooltip, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useProfilePictureStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 100,
    margin: theme.spacing(1, 1.5),
    cursor: "pointer",
    position: "relative",
  },
  fileInput: {
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0,
    width: "100%",
    height: "100%",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  avatarDimmed: {
    opacity: 0.5,
  },
  spinner: {
    position: "absolute",
    color: theme.palette.text.primary,
    zIndex: 1000,
  },
}));

const ProfilePicture: FC<FieldProps> = (props) => {
  const classes = useProfilePictureStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useClosableSnackbar();
  const [uploading, setUploading] = useState(false);

  const onUpload = async (files: FileList | null) => {
    if (files === null) return;

    const file = files[0];
    if (!file) return;

    try {
      setUploading(true);
      validateFileSize(file, 5);
      await uploadUserPicture(file, props.user);
      enqueueSnackbar("Uploaded New Profile Picture", {
        variant: "success",
      });
    } catch (e: any) {
      const message = typeof e === "string" ? e : e.message;
      enqueueSnackbar(message || "An error occurred. Please try again.", {
        variant: "error",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <label htmlFor="profile-picture-upload" className={classes.container}>
      <input
        id="profile-picture-upload"
        name="profile-picture-upload"
        type="file"
        accept="image/*"
        onInput={(e) => onUpload((e.target as HTMLInputElement).files)}
        className={classes.fileInput}
      />
      {uploading && (
        <CircularProgress size={theme.spacing(5)} className={classes.spinner} />
      )}
      <Tooltip title="Upload New Picture">
        <Avatar
          variant="circular"
          src={props.userDoc?.picture}
          className={clsx(classes.avatar, uploading && classes.avatarDimmed)}
        />
      </Tooltip>
    </label>
  );
};

export default ProfilePicture;

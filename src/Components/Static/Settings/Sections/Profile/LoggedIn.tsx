// React Imports
import React, { FC, useState } from "react";
import { getExtension } from "mime";
import { useClosableSnackbar } from "../../../../../Hooks";
import { User } from "../../../../../Context/UserContext";

// Firebase Imports
import "firebase/auth";
import "firebase/storage";
import { useAuth, useStorage } from "../../../../../Utils/Config/firebase";

// Material UI Imports
import {
  Avatar,
  Button,
  CircularProgress,
  InputAdornment,
  makeStyles,
  TextField,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Check, CloudUpload } from "@material-ui/icons";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    padding: theme.spacing(2),
  },
  info: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing(0, 3, 2),

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  input: {
    margin: theme.spacing(1, 1.5),

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: theme.spacing(1, 0),
    },
  },
  saveIcon: {
    cursor: "pointer",
  },
  savingSpinner: {
    color: theme.palette.text.primary,
  },
  emailInput: {
    cursor: "not-allowed",
  },
  logout: {
    borderColor: theme.palette.error.main,
    color: theme.palette.error.main,
    marginLeft: "auto",

    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
}));

interface LoggedInProps {
  user: User;
}

const LoggedIn: FC<LoggedInProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <div className={classes.container}>
      <div className={classes.info}>
        <ProfilePicture {...props} />
        <NameField {...props} />
        <TextField
          value={props.user.email}
          name="email"
          type="email"
          label="Email"
          variant="outlined"
          size={isSizeXS ? "small" : "medium"}
          disabled
          className={classes.input}
          inputProps={{
            className: classes.emailInput,
          }}
        />
      </div>
      <SignOutButton />
    </div>
  );
};

const useProfilePictureStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    width: 56,
    margin: theme.spacing(1, 1.5),
    cursor: "pointer",
    position: "relative",
  },
  fileInput: {
    position: "absolute",
    left: "0px",
    top: "0px",
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

const ProfilePicture: FC<LoggedInProps> = (props) => {
  const classes = useProfilePictureStyles();
  const theme = useTheme();
  const storage = useStorage();
  const { enqueueSnackbar } = useClosableSnackbar();
  const [uploading, setUploading] = useState(false);

  const onUpload = async (files: FileList | null) => {
    if (files === null) return;

    const file = files[0];
    if (!file) return;

    try {
      setUploading(true);
      const size = file.size / 1000 / 1000; // Size in MB
      if (size > 5) {
        const formattedSize = size.toFixed(1);
        throw new Error(
          `File size must be less than 5 MB (Uploaded file size was ${formattedSize} MB)`
        );
      }
      const ext = getExtension(file.type);
      const ref = storage
        .ref()
        .child(`users/${props.user.id}/profile_picture${ext ? `.${ext}` : ""}`);
      const upload = await ref.put(file);
      const url = await upload.ref.getDownloadURL();
      await props.user.updatePicture(url);
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
          variant="rounded"
          src={props.user.picture}
          className={clsx(classes.avatar, uploading && classes.avatarDimmed)}
        />
      </Tooltip>
    </label>
  );
};

const NameField: FC<LoggedInProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));
  const { enqueueSnackbar } = useClosableSnackbar();
  const [name, setName] = useState(props.user.name);
  const [isNameSaving, setNameSaving] = useState(false);

  const onNameSave = async () => {
    setNameSaving(true);
    try {
      await props.user.updateName(name);
      enqueueSnackbar("Saved Name", {
        variant: "success",
      });
    } catch (e: any) {
      const message = typeof e === "string" ? e : e.message;
      enqueueSnackbar(message || "An error occurred. Please try again.", {
        variant: "error",
      });
    } finally {
      setNameSaving(false);
    }
  };

  return (
    <TextField
      value={name}
      onChange={(e) => setName(e.target.value)}
      name="name"
      type="text"
      label="Name"
      variant="outlined"
      size={isSizeXS ? "small" : "medium"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {name === props.user.name ? (
              <Tooltip title="Saved">
                <Check fontSize="small" />
              </Tooltip>
            ) : isNameSaving ? (
              <CircularProgress
                size={theme.spacing(2.5)}
                className={classes.savingSpinner}
              />
            ) : (
              <Tooltip title="Save Name">
                <CloudUpload
                  fontSize="small"
                  onClick={onNameSave}
                  className={classes.saveIcon}
                />
              </Tooltip>
            )}
          </InputAdornment>
        ),
      }}
      className={classes.input}
    />
  );
};

const SignOutButton: FC = () => {
  const classes = useStyles();
  const auth = useAuth();
  const { enqueueSnackbar } = useClosableSnackbar();

  return (
    <Button
      variant="outlined"
      onClick={() => {
        auth.signOut().then(() =>
          enqueueSnackbar("Signed Out", {
            variant: "success",
          })
        );
      }}
      className={classes.logout}
    >
      Sign Out
    </Button>
  );
};

export default LoggedIn;
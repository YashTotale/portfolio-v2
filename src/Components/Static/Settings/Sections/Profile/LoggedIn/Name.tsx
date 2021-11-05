// React Imports
import React, { FC, useEffect, useState } from "react";
import clsx from "clsx";
import { ProfileProps } from "./index";
import { useClosableSnackbar } from "../../../../../../Hooks";

// Firebase Imports
import { updateUserName } from "../../../../../../Controllers/user.controller";

// Material UI Imports
import {
  CircularProgress,
  IconButton,
  Input,
  Skeleton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Check, Clear, Edit } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    maxWidth: "75%",
    margin: theme.spacing(1, 0),
  },
  name: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  icon: {
    position: "absolute",
    right: theme.spacing(-4.5),
  },
  iconGroup: {
    display: "flex",
    position: "absolute",
    right: theme.spacing(-8),
  },
  inputContainer: {
    [theme.breakpoints.only("xs")]: {
      width: 140,
    },
  },
  input: {
    textAlign: "center",
  },
  savingSpinner: {
    color: theme.palette.text.disabled,
  },
}));

const Name: FC<ProfileProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));
  const { enqueueSnackbar } = useClosableSnackbar();

  const savedName = props.userDoc?.name ?? "";
  const [name, setName] = useState(savedName);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (savedName !== name) setName(savedName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedName]);

  const onNameSave = async () => {
    setIsSaving(true);
    try {
      await updateUserName(props.user, name);
      enqueueSnackbar("Saved Name", {
        variant: "success",
      });
      setIsEditing(false);
    } catch (e: any) {
      const message = typeof e === "string" ? e : e.message;
      enqueueSnackbar(message || "An error occurred. Please try again.", {
        variant: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!props.userDoc) return <Loading />;

  if (!isEditing) {
    return (
      <div className={classes.container}>
        <Typography
          align="center"
          variant={isSizeXS ? "h6" : "h5"}
          className={classes.name}
        >
          {savedName}
        </Typography>
        <Tooltip title="Edit Name">
          <IconButton
            size="small"
            onClick={() => setIsEditing(true)}
            className={classes.icon}
          >
            <Edit fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        aria-label="name"
        className={classes.inputContainer}
        inputProps={{
          className: classes.input,
        }}
      />
      {!isSaving ? (
        <div className={classes.iconGroup}>
          <Tooltip title="Save Name">
            <IconButton
              disabled={name === savedName || !name}
              size="small"
              onClick={onNameSave}
            >
              <Check fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Cancel">
            <IconButton
              size="small"
              onClick={() => {
                setName(savedName);
                setIsEditing(false);
              }}
            >
              <Clear fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      ) : (
        <CircularProgress
          size={theme.spacing(2.5)}
          className={clsx(classes.icon, classes.savingSpinner)}
        />
      )}
    </div>
  );
};

const useLoadingStyles = makeStyles((theme) => ({
  loading: {
    margin: theme.spacing(1, 0),
  },
}));

const Loading: FC = () => {
  const classes = useLoadingStyles();
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <Skeleton variant="rectangular" className={classes.loading}>
      <Typography variant={isSizeXS ? "h6" : "h5"}>Filler Username</Typography>
    </Skeleton>
  );
};

export default Name;

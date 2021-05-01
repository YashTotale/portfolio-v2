// React Imports
import React, { FC, useState } from "react";
import { SIDEBAR_WIDTH } from "../Utils/constants";

// Redux Imports
import { useSelector } from "react-redux";
import { getUser, toggleDarkMode, togglePopup, toggleSidebar } from "../Redux";
import { AppDispatch, useAppDispatch } from "../Store";

// Firebase Imports
import { FirebaseReducer } from "react-redux-firebase";

// Material UI Imports
import {
  makeStyles,
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  useTheme,
  Avatar,
  Menu,
  MenuItem,
  CircularProgress,
  useMediaQuery,
} from "@material-ui/core";
import {
  Brightness7,
  Brightness4,
  Person,
  Menu as MenuButton,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    [theme.breakpoints.up("lg")]: {
      marginLeft: SIDEBAR_WIDTH,
    },
  },
  rightIcons: {
    marginLeft: "auto",
  },
  avatar: {
    cursor: "pointer",
  },
}));

const Navbar: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const user = useSelector(getUser);

  const isSizeSmall = useMediaQuery(theme.breakpoints.down("md"));
  const isDarkMode = theme.palette.type === "dark";

  return (
    <AppBar elevation={2} color="transparent" position="static">
      <Toolbar className={classes.toolbar}>
        <div>
          {isSizeSmall && (
            <Tooltip title="Toggle Sidebar">
              <IconButton onClick={() => dispatch(toggleSidebar())}>
                <MenuButton />
              </IconButton>
            </Tooltip>
          )}
        </div>
        <div className={classes.rightIcons}>
          <Tooltip title={`Toggle ${isDarkMode ? "Light" : "Dark"} Mode`}>
            <IconButton
              onClick={() => {
                dispatch(toggleDarkMode());
              }}
            >
              {isDarkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>
          {!user.isLoaded ? (
            <CircularProgress />
          ) : user.isEmpty ? (
            <LoginButton dispatch={dispatch} classes={classes} />
          ) : (
            <ProfileMenu dispatch={dispatch} user={user} classes={classes} />
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

interface LoginButtonProps {
  dispatch: AppDispatch;
  classes: ReturnType<typeof useStyles>;
}

const LoginButton: FC<LoginButtonProps> = ({ dispatch }) => {
  return (
    <Tooltip title="Login">
      <IconButton
        onClick={() => dispatch(togglePopup({ open: true, type: "login" }))}
      >
        <Person />
      </IconButton>
    </Tooltip>
  );
};

interface ProfileMenuProps {
  user: FirebaseReducer.AuthState;
  dispatch: AppDispatch;
  classes: ReturnType<typeof useStyles>;
}

const ProfileMenu: FC<ProfileMenuProps> = ({ user, dispatch, classes }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Tooltip title="Profile">
        <Avatar
          alt={user.displayName ?? "Profile Picture"}
          src={user.photoURL ?? undefined}
          variant="circular"
          onClick={handleClick}
          className={classes.avatar}
        />
      </Tooltip>
      <Menu
        elevation={6}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={() => {
            dispatch(togglePopup({ type: "logout", open: true }));
            handleClose();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default Navbar;

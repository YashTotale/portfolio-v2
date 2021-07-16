// React Imports
import React, { cloneElement, FC } from "react";

// Material UI Imports
import {
  Button,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { GitHub, Launch } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  links: {
    margin: theme.spacing(1),
    minWidth: "140px",
    overflow: "hidden",

    [theme.breakpoints.only("xs")]: {
      margin: theme.spacing(0, 1),
    },
  },
}));

interface CustomButton {
  label: string;
  value: string;
  icon: JSX.Element;
}

interface ButtonLinksProps {
  link?: string;
  github?: string;
  linkLabel?: string;
  buttons?: CustomButton[];
}

const ButtonLinks: FC<ButtonLinksProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("sm"));

  if (!props.link && !props.github) return null;
  if (!isSizeSmall) return null;

  return (
    <div className={classes.links}>
      <ButtonLink
        value={props.link}
        label={props.linkLabel ?? "Website"}
        icon={<Launch />}
      />
      <ButtonLink value={props.github} label="GitHub" icon={<GitHub />} />
      {props.buttons &&
        props.buttons.map((button, i) => <ButtonLink key={i} {...button} />)}
    </div>
  );
};

const useButtonLinkStyles = makeStyles((theme) => ({
  link: {
    textDecorationColor: theme.palette.text.primary,
  },
  linkButton: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: theme.palette.text.primary,
    textDecoration: "inherit",
    width: "100%",
    textTransform: "none",
    padding: theme.spacing(0.5, 1.5),
    margin: theme.spacing(1, 0),
  },
  linkText: {
    marginRight: theme.spacing(0.5),
  },
}));

interface ButtonLinkProps {
  label: string;
  value?: string;
  icon: JSX.Element;
}

const ButtonLink: FC<ButtonLinkProps> = (props) => {
  const classes = useButtonLinkStyles();

  if (!props.value) return null;

  return (
    <a
      href={props.value}
      target="_blank"
      rel="noopener noreferrer"
      className={classes.link}
    >
      <Button variant="outlined" className={classes.linkButton}>
        <Typography variant="body2" className={classes.linkText}>
          View {props.label}
        </Typography>
        {cloneElement(props.icon, {
          fontSize: "small",
        })}
      </Button>
    </a>
  );
};

export default ButtonLinks;

// React Imports
import React, { cloneElement, FC } from "react";

// Material UI Imports
import {
  Button,
  Link,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { GitHub, Launch, LinkedIn } from "@mui/icons-material";

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
  linkedin?: string;
  linkLabel?: string;
  buttons?: CustomButton[];
}

const ButtonLinks: FC<ButtonLinksProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("md"));

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
      <ButtonLink value={props.linkedin} label="LinkedIn" icon={<LinkedIn />} />
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
    <Link
      href={props.value}
      target="_blank"
      rel="noopener noreferrer"
      className={classes.link}
    >
      <Button variant="outlined" className={classes.linkButton} color="inherit">
        <Typography variant="body2" className={classes.linkText}>
          View {props.label}
        </Typography>
        {cloneElement(props.icon, {
          fontSize: "small",
        })}
      </Button>
    </Link>
  );
};

export default ButtonLinks;

// React Imports
import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNpm, faHackerrank } from "@fortawesome/free-brands-svg-icons";
import LinkIcon from "../../Atomic/Icon/Link";
import { BUILD_TIME } from "../../../Utils/constants";

// Material UI Imports
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { GitHub, LinkedIn, Mail } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(7),
    padding: theme.spacing(1, 0, 2),
  },
  icon: {
    margin: theme.spacing(0, 1),
  },
}));

interface Social {
  label: string;
  url: string;
  icon: JSX.Element;
}

const socials: Social[] = [
  {
    label: "NPM",
    url: "https://www.npmjs.com/~yasht/",
    icon: <FontAwesomeIcon icon={faNpm} />,
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/yash-totale/",
    icon: <LinkedIn />,
  },
  {
    label: "GitHub",
    url: "https://github.com/YashTotale/",
    icon: <GitHub />,
  },
  {
    label: "Mail",
    url: "mailto:totaleyash@gmail.com",
    icon: <Mail />,
  },
  {
    label: "HackerRank",
    url: "https://www.hackerrank.com/yashtotale/",
    icon: <FontAwesomeIcon icon={faHackerrank} />,
  },
];

const Footer: FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <Container component="footer" className={classes.footer}>
      <Box display="flex" justifyContent="center">
        {socials.map((social, i) => (
          <LinkIcon
            key={i}
            label={social.label}
            href={social.url}
            icon={social.icon}
            className={classes.icon}
          />
        ))}
      </Box>
      <Box mt={isSizeXS ? 2 : 1}>
        <Typography variant="body2" color="textSecondary" align="center">
          Copyright © Yash Totale {new Date().getFullYear()}
        </Typography>
      </Box>
      <Box mt={1}>
        <Typography variant="body2" color="textSecondary" align="center">
          Last updated on{" "}
          {new Date(BUILD_TIME).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            timeZoneName: "short",
            timeZone:
              Intl.DateTimeFormat().resolvedOptions().timeZone ??
              "America/Los_Angeles",
          })}
        </Typography>
      </Box>
    </Container>
  );
};

export default Footer;

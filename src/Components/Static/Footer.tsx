// React Imports
import React, { FC } from "react";
import LinkIcon from "../Atomic/Icon/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNpm, faHackerrank } from "@fortawesome/free-brands-svg-icons";

// Material UI Imports
import { Box, Container, makeStyles, Typography } from "@material-ui/core";
import { GitHub, LinkedIn, Mail } from "@material-ui/icons";

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
      <Box mt={1}>
        <Typography variant="body2" color="textSecondary" align="center">
          Copyright © Yash Totale {new Date().getFullYear()}
        </Typography>
      </Box>
    </Container>
  );
};

export default Footer;

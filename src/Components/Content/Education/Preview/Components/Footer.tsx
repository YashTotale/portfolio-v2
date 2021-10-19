// React Imports
import React, { FC } from "react";
import Timeline from "../../../Shared/Timeline";
import FloatingIcons from "../../../Shared/FloatingIcons";
import { generateEducationTimeline } from "../../../../../Utils/Content/education";
import { ResolvedEducation } from "../../../../../Utils/types";

// Redux Imports
import { getEducationSort, setEducationSort } from "../../../../../Redux";

// Material UI Imports
import makeStyles from "@mui/styles/makeStyles";
import { Theme, useMediaQuery, useTheme } from "@mui/material";
import { Description } from "@mui/icons-material";

interface StyleProps {
  hasLinks: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  footer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: "100%",
    minHeight: ({ hasLinks }) => (hasLinks ? theme.spacing(6) : "default"),

    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
      justifyContent: "start",
      minHeight: ({ hasLinks }) => (hasLinks ? theme.spacing(8) : "default"),
    },
  },
  timeline: {
    margin: theme.spacing(1),
  },
}));

type FooterProps = ResolvedEducation & {
  search?: string;
};

const Footer: FC<FooterProps> = (props) => {
  const classes = useStyles({
    hasLinks: !!(props.link || props.github || props.certificate),
  });
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <div className={classes.footer}>
      <Timeline
        sort="Latest"
        contentType="education"
        getCurrentSort={getEducationSort}
        setCurrentSort={setEducationSort}
        search={props.search}
        className={classes.timeline}
      >
        {generateEducationTimeline(props)}
      </Timeline>
      <FloatingIcons
        linkLabel="Website"
        link={props.link}
        github={props.github}
        direction="row"
        top={isSizeXS ? 3.5 : 0.5}
        right={isSizeXS ? "auto" : undefined}
        icons={
          props.certificate && [
            {
              label: "Certificate",
              value: props.certificate.file.url,
              icon: <Description />,
            },
          ]
        }
      />
    </div>
  );
};

export default Footer;

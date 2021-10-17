// React Imports
import React, { FC } from "react";
import clsx from "clsx";
import TagChip from "../../Tag/Mini";
import FloatingIcons from "../../Shared/FloatingIcons";
import Timeline from "../../Shared/Timeline";
import DynamicPaper from "../../../Atomic/DynamicPaper";
import DynamicImage from "../../../Atomic/DynamicImage";
import MatchHighlight from "../../../Atomic/MatchHighlight";
import HorizontalDivider from "../../../Atomic/Divider/Horizontal";
import { ResolvedCertification } from "../../../../Utils/types";

// Redux Imports
import { getCertificationSort, setCertificationSort } from "../../../../Redux";

// Material UI Imports
import { Link, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: 225,
    maxWidth: 250,
    position: "relative",

    [theme.breakpoints.only("xs")]: {
      width: "100%",
      flex: "none",
    },
  },
  display: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    padding: theme.spacing(1),
    width: "100%",
  },
  icon: {
    maxWidth: 215,
    height: 150,
    margin: theme.spacing(1.5),
  },
  title: {
    textAlign: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
  },
  provider: {
    margin: theme.spacing(1, 1),
  },
  date: {
    margin: theme.spacing(0, 1, 1),
  },
  tags: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing(1),
  },
}));

export interface PreviewProps {
  certification: ResolvedCertification;
  search?: string;
  className?: string;
}

const Preview: FC<PreviewProps> = (props) => {
  const classes = useStyles();
  const cert = props.certification;
  const providerEl = (
    <MatchHighlight toMatch={props.search}>
      {cert.provider.title}
    </MatchHighlight>
  );

  return (
    <DynamicPaper className={clsx(classes.container, props.className)}>
      <FloatingIcons link={cert.link} linkLabel="Certification" />
      <div className={classes.display}>
        <DynamicImage
          src={`${cert.provider.image.file.url}?w=200`}
          alt={cert.provider.title}
          className={classes.icon}
        />
        <Typography variant="h5" title={cert.title} className={classes.title}>
          <MatchHighlight toMatch={props.search}>{cert.title}</MatchHighlight>
        </Typography>
      </div>
      <HorizontalDivider flexItem />
      <div className={classes.info}>
        <Typography variant="body1" className={classes.provider}>
          Provided by{" "}
          {cert.provider.link ? (
            <Link
              href={cert.provider.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {providerEl}
            </Link>
          ) : (
            providerEl
          )}
        </Typography>
        <Timeline
          sort="Newest"
          contentType="certifications"
          getCurrentSort={getCertificationSort}
          setCurrentSort={setCertificationSort}
          search={props.search}
          withResize={false}
          className={classes.date}
        >
          {cert.date}
        </Timeline>
        {!!cert.tags.length && (
          <div className={classes.tags}>
            {cert.tags.map((tag) => (
              <TagChip key={tag.id} id={tag.id} search={props.search} />
            ))}
          </div>
        )}
      </div>
    </DynamicPaper>
  );
};

export default Preview;

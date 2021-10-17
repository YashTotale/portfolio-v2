// React Imports
import React, { FC } from "react";
import Badge from "../../../Badge";
import { ResolvedProject } from "../../../../../Utils/types";

// Material UI Imports
import { capitalize } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  badges: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    margin: theme.spacing(0.25, 0),
  },
  badge: {
    margin: theme.spacing(1, 0.5),
    marginBottom: 0,

    [theme.breakpoints.only("xs")]: {
      margin: theme.spacing(0.2, 0.5),
    },
  },
}));

type BadgesProps = ResolvedProject;

const Badges: FC<BadgesProps> = (props) => {
  const classes = useStyles();

  if (!props.badges && !props.github) return null;

  return (
    <>
      {props.badges && (
        <div className={classes.badges}>
          {props.badges.map((badge) => (
            <Badge {...badge} key={badge.id} className={classes.badge} />
          ))}
        </div>
      )}
      {props.github && (
        <div className={classes.badges}>
          {GITHUB_BADGE_TYPES.map((type) => {
            const id = `${props.id}-github-${type}`;
            return (
              <GitHubBadge
                id={id}
                key={id}
                projectName={props.title}
                githubUrl={props.github!}
                type={type}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

const GITHUB_BADGE_TYPES = ["stars", "watchers", "forks"] as const;

interface GitHubBadgeProps {
  id: string;
  projectName: string;
  githubUrl: string;
  type: typeof GITHUB_BADGE_TYPES[number];
}

const GitHubBadge: FC<GitHubBadgeProps> = (props) => {
  const classes = useStyles();
  const githubUrl =
    props.githubUrl.charAt(props.githubUrl.length - 1) === "/"
      ? props.githubUrl.slice(0, -1)
      : props.githubUrl;
  const split = githubUrl.split("/");
  const githubUsername = split[split.length - 2];
  const githubRepo = split[split.length - 1];

  return (
    <Badge
      id={props.id}
      source={`https://img.shields.io/github/${props.type}/${githubUsername}/${githubRepo}?style=social`}
      title={`${props.projectName} GitHub ${capitalize(props.type)}`}
      url={props.githubUrl}
      className={classes.badge}
    />
  );
};

export default Badges;

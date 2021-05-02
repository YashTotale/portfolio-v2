//React Imports
import React, { FC } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import { getImageTitle, getImageUrl } from "../../API/helpers";
import { ProjectFields } from "../../Utils/types";

//Material UI Imports
import { makeStyles, Paper, Theme, Typography } from "@material-ui/core";

interface StyleProps {
  isSingle: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  project: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 550,
    margin: theme.spacing(0, 2),
    marginRight: ({ isSingle }) =>
      isSingle ? 550 + 3 * theme.spacing(2) : undefined,
  },
  projectTop: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  projectImage: {
    margin: theme.spacing(2, 0),
  },
  projectTitle: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    textAlign: "center",
    width: 550 - theme.spacing(3),
  },
  projectInfo: {
    flexGrow: 1,
    width: "100%",
  },
}));

type ProjectProps = ProjectFields & {
  isSingle?: boolean;
};

const Project: FC<ProjectProps> = ({
  title,
  description,
  image,
  isSingle = false,
}) => {
  const classes = useStyles({ isSingle });

  return (
    <Paper className={classes.project} elevation={10}>
      <div className={classes.projectTop}>
        <img
          src={getImageUrl(image)}
          alt={getImageTitle(image)}
          width={175}
          className={classes.projectImage}
        />
        <Typography
          variant="h4"
          color="primary"
          className={classes.projectTitle}
        >
          {title}
        </Typography>
      </div>
      <div className={classes.projectInfo}>
        {documentToReactComponents(description as Document)}
      </div>
    </Paper>
  );
};

export default Project;

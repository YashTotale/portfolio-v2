//React Imports
import React, { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import FloatingIcons from "./FloatingIcons";
import Tag from "./Tag";
import { getImageTitle, getImageUrl } from "../../../API/helpers";
import { ProjectFields } from "../../../Utils/types";

//Material UI Imports
import {
  Divider,
  Link,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";

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
      isSingle ? 550 + 3 * theme.spacing(2) : theme.spacing(2),
  },
  projectTop: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "relative",
  },
  projectImage: {
    margin: theme.spacing(2, 0),
  },
  projectTitle: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "center",
    width: 550 - theme.spacing(4),
    marginBottom: theme.spacing(1),
  },
  projectInfo: {
    flexGrow: 1,
    width: "100%",
    margin: theme.spacing(1, 0),
  },
  projectDivider: {
    height: "1px",
  },
  projectTags: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing(1),
  },
}));

type ProjectProps = ProjectFields & {
  id: string;
  isSingle?: boolean;
};

const Project: FC<ProjectProps> = (props) => {
  const { id, title, description, image, tags, isSingle = false } = props;
  const classes = useStyles({ isSingle });

  return (
    <Paper className={classes.project} elevation={12}>
      <Paper className={classes.projectTop} elevation={3}>
        <FloatingIcons {...props} />
        <img
          src={getImageUrl(image)}
          alt={getImageTitle(image)}
          width={175}
          className={classes.projectImage}
        />
        <Link component={RouterLink} to={`/projects/${id}`}>
          <Typography
            variant="h4"
            color="primary"
            className={classes.projectTitle}
          >
            {title}
          </Typography>
        </Link>
      </Paper>
      <div className={classes.projectInfo}>
        {documentToReactComponents(description as Document)}
      </div>
      <Divider flexItem className={classes.projectDivider} />
      <div className={classes.projectTags}>
        {tags.map((tag) => (
          <Tag key={tag.sys.id} id={tag.sys.id} {...tag.fields} />
        ))}
      </div>
    </Paper>
  );
};

export default Project;

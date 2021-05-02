// React Imports
import React, { FC } from "react";
import Category from "./Category";
import Item from "./Item";
import { SIDEBAR_WIDTH } from "../../Utils/constants";
import { useProjects, useTags } from "../../Context/DataContext";

// Material UI Imports
import { Divider, List, makeStyles, Toolbar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  list: {
    width: SIDEBAR_WIDTH,
  },
}));

const Contents: FC = () => {
  const classes = useStyles();
  const projects = useProjects();
  const tags = useTags();

  return (
    <>
      <Toolbar />
      <Divider />
      <List disablePadding className={classes.list}>
        <Category label="Home" to="/" withChildren={false} />
        <Category label="Projects" to="/projects">
          {projects === null
            ? null
            : Object.entries(projects).map(([id, fields]) => (
                <Item key={id} label={fields.title} to={`/projects/${id}`} />
              ))}
        </Category>
        <Category label="Tags" to="/tags">
          {tags === null
            ? null
            : Object.entries(tags).map(([id, fields]) => (
                <Item key={id} label={fields.title} to={`/tags/${id}`} />
              ))}
        </Category>
      </List>
    </>
  );
};

export default Contents;

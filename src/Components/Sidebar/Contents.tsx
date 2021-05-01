// React Imports
import React, { FC } from "react";
import Category from "./Category";
import Item from "./Item";
import { SIDEBAR_WIDTH } from "../../Utils/constants";
import { useProjects } from "../../Context/ProjectsContext";

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

  return (
    <>
      <Toolbar />
      <Divider />
      <List disablePadding className={classes.list}>
        <Category label="Projects" to="/projects">
          {projects === null
            ? null
            : Object.entries(projects).map(([id, fields]) => (
                <Item key={id} label={fields.title} to={`/projects/${id}`} />
              ))}
        </Category>
      </List>
    </>
  );
};

export default Contents;

// React Imports
import React, { FC, useMemo } from "react";
import Fuse from "fuse.js";
import { Document } from "@contentful/rich-text-types";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import debounce from "lodash.debounce";
import SearchBar from "./SearchBar";
import { Projects } from "../../../Utils/types";

// Material UI Imports
import { Divider, IconButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  projectFilters: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    padding: theme.spacing(0, 3),
  },
  divider: {
    height: "1px",
    margin: theme.spacing(1, 2, 0),
  },
}));

interface FiltersProps {
  projects: Projects;
  setProjects: (p: Projects | null) => void;
}

const Filters: FC<FiltersProps> = ({ projects, setProjects }) => {
  const classes = useStyles();
  const list = useMemo(
    () =>
      Object.entries(projects).map(([key, value]) => ({
        ...value,
        id: key,
        description: documentToPlainTextString(value.description as Document),
        link: value.link ?? "",
        sourceCode: value.sourceCode ?? "",
      })),
    [projects]
  );

  const fuse = new Fuse(list, {
    keys: ["title", "description", "link", "sourceCode"],
    threshold: 0.3,
    ignoreLocation: true,
  });

  const onSearchChange = debounce((search: string) => {
    if (!search) setProjects(null);
    else {
      const filtered = fuse.search(search);

      const projectsArr = filtered.reduce((obj, p) => {
        const id = p.item.id;
        return { ...obj, [id]: projects[id] };
      }, {} as Projects);

      setProjects(projectsArr);
    }
  }, 500);

  return (
    <>
      <div className={classes.projectFilters}>
        <SearchBar onChange={onSearchChange} />
      </div>
      <IconButton size="small"></IconButton>
      <Divider flexItem className={classes.divider} />
    </>
  );
};

export default Filters;

//React Imports
import React, { FC, useEffect, useState } from "react";
import Filters, { Matches } from "./Filters";
import Project from "./Project";
import { useProjects } from "../../Context/DataContext";
import { chunk } from "../../Utils/funcs";

//Material UI Imports
import {
  CircularProgress,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Projects } from "../../Utils/types";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "stretch",
    padding: theme.spacing(0, 2),
  },
  projects: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  projectChunk: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    width: "100%",
  },
}));

const ProjectsPage: FC = () => {
  const projects = useProjects();
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [matches, setMatches] = useState<Matches>({});

  useEffect(() => {
    if (filteredProjects === null && projects !== null) {
      setFilteredProjects(projects);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  if (projects === null || filteredProjects === null)
    return (
      <Container>
        <CircularProgress />
      </Container>
    );

  return (
    <Container>
      <Filters
        projects={projects}
        setProjects={(filtered) =>
          setFilteredProjects(filtered === null ? projects : filtered)
        }
        setMatches={setMatches}
      />
      <Contents projects={filteredProjects} matches={matches} />
    </Container>
  );
};

const Container: FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
};

interface ContentsProps {
  projects: Projects;
  matches: Matches;
}

const Contents: FC<ContentsProps> = ({ projects, matches }) => {
  const classes = useStyles();
  const theme = useTheme();
  console.log(theme.breakpoints);
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  if (isSmall)
    return (
      <div className={classes.projects}>
        {Object.entries(projects).map(([id, fields]) => (
          <Project
            key={id}
            id={id}
            matches={matches[id]}
            pushLeft={false}
            {...fields}
          />
        ))}
      </div>
    );

  const chunks = chunk(Object.keys(projects), 2);

  return (
    <div className={classes.projects}>
      {chunks.map((ids, i) => (
        <div key={i} className={classes.projectChunk}>
          {ids.map((id) => (
            <Project
              key={id}
              id={id}
              matches={matches[id]}
              pushLeft={ids.length === 1}
              {...projects[id]}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProjectsPage;

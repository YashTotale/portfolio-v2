// React Imports
import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import BaseOverlay from "../../Atomic/Overlay";
import { useTitle } from "../../../Context/HeadContext";
import { generateSearch } from "../../../Utils/funcs";
import { getProject } from "../../../Utils/Content/projects";

interface OverlayProps {
  id: string;
  className?: string;
}

const Overlay: FC<OverlayProps> = (props) => {
  const location = useLocation();
  const title = useTitle();

  const project = getProject(props.id);
  if (!project) return null;

  return (
    <BaseOverlay
      to={{
        pathname: `/projects/${project.slug}`,
        search: generateSearch(
          {
            from_path: location.pathname,
            from_type: "associated",
          },
          title
        ),
      }}
      icon={project.image}
      label={project.title}
      className={props.className}
    />
  );
};

export default Overlay;

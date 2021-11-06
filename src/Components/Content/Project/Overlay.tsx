// React Imports
import React, { FC } from "react";
import BaseOverlay from "../../Atomic/Overlay";
import { getProject } from "../../../Utils/Content/projects";

interface OverlayProps {
  id: string;
  className?: string;
}

const Overlay: FC<OverlayProps> = (props) => {
  const project = getProject(props.id);
  if (!project) return null;

  return (
    <BaseOverlay
      to={`/projects/${project.slug}`}
      icon={project.image}
      label={project.title}
      className={props.className}
    />
  );
};

export default Overlay;

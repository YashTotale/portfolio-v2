// React Imports
import React, { FC } from "react";
import BaseOverlay from "../../Atomic/Overlay";
import { Paths } from "../../Static/NavController";
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
      to={Paths.Project(project.slug)}
      icon={project.image}
      label={project.title}
      className={props.className}
    />
  );
};

export default Overlay;

// React Imports
import React, { FC } from "react";
import BaseOverlay from "../../Atomic/Overlay";
import { getSingleCertification } from "../../../Utils/Content/certification";

interface OverlayProps {
  id: string;
  className?: string;
}

const Overlay: FC<OverlayProps> = (props) => {
  const certification = getSingleCertification(props.id);
  if (!certification) return null;

  return (
    <BaseOverlay
      to="/certifications"
      icon={certification.provider.image}
      label={certification.title}
      className={props.className}
    />
  );
};

export default Overlay;

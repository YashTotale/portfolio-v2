// React Imports
import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import BaseOverlay from "../../Atomic/Overlay";
import { useTitle } from "../../../Context/HeadContext";
import { generateSearch } from "../../../Utils/funcs";
import { getSingleCertification } from "../../../Utils/Content/certification";

interface OverlayProps {
  id: string;
  className?: string;
}

const Overlay: FC<OverlayProps> = (props) => {
  const location = useLocation();
  const title = useTitle();

  const certification = getSingleCertification(props.id);
  if (!certification) return null;

  return (
    <BaseOverlay
      to={{
        pathname: "/certifications",
        search: generateSearch(
          {
            from_path: location.pathname,
            from_type: "associated",
          },
          title
        ),
      }}
      icon={certification.provider.image}
      label={certification.title}
      className={props.className}
    />
  );
};

export default Overlay;

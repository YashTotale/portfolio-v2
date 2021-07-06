// React Imports
import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import BaseOverlay from "../../Atomic/Overlay";
import { useTitle } from "../../../Context/HeadContext";
import { generateSearch } from "../../../Utils/funcs";
import { getSingleExperience } from "../../../Utils/Content/experience";

interface OverlayProps {
  id: string;
  className?: string;
}

const Overlay: FC<OverlayProps> = (props) => {
  const location = useLocation();
  const title = useTitle();

  const experience = getSingleExperience(props.id);
  if (!experience) return null;

  return (
    <BaseOverlay
      to={{
        pathname: `/experience/${experience.slug}`,
        search: generateSearch(
          {
            from_path: location.pathname,
            from_type: "associated",
          },
          title
        ),
      }}
      icon={experience.image}
      label={experience.title}
      className={props.className}
    />
  );
};

export default Overlay;

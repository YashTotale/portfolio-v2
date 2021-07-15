// React Imports
import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import BaseOverlay from "../../Atomic/Overlay";
import { useTitle } from "../../../Context/HeadContext";
import { generateSearch } from "../../../Utils/funcs";
import { getSingleEducation } from "../../../Utils/Content/education";
import { getDefaultEducationImage } from "../../../Utils/Content/main";
import { getAsset } from "../../../Utils/Content/assets";

interface OverlayProps {
  id: string;
  className?: string;
}

const Overlay: FC<OverlayProps> = (props) => {
  const location = useLocation();
  const title = useTitle();
  const defaultImage = getDefaultEducationImage();

  const education = getSingleEducation(props.id);
  if (!education) return null;

  return (
    <BaseOverlay
      to={{
        pathname: `/education/${education.slug}`,
        search: generateSearch(
          {
            from_path: location.pathname,
            from_type: "associated",
          },
          title
        ),
      }}
      icon={
        education.provider ? getAsset(education.provider.image) : defaultImage
      }
      label={education.title}
      className={props.className}
    />
  );
};

export default Overlay;

// React Imports
import React, { FC } from "react";
import BaseOverlay from "../../Atomic/Overlay";
import { Paths } from "../../Static/NavController";
import { getSingleEducation } from "../../../Utils/Content/education";
import { getDefaultEducationImage } from "../../../Utils/Content/main";
import { getAsset } from "../../../Utils/Content/assets";

interface OverlayProps {
  id: string;
  className?: string;
}

const Overlay: FC<OverlayProps> = (props) => {
  const defaultImage = getDefaultEducationImage();

  const education = getSingleEducation(props.id);
  if (!education) return null;

  return (
    <BaseOverlay
      to={Paths.SingleEducation(education.slug)}
      icon={
        education.provider ? getAsset(education.provider.image) : defaultImage
      }
      label={education.title}
      className={props.className}
    />
  );
};

export default Overlay;

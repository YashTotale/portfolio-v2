// React Imports
import React, { FC } from "react";
import BaseOverlay from "../../Atomic/Overlay";
import {
  generateExperienceTitle,
  getSingleExperience,
} from "../../../Utils/Content/experience";
import { useTheme } from "@mui/material";

interface OverlayProps {
  id: string;
  className?: string;
}

const Overlay: FC<OverlayProps> = (props) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const experience = getSingleExperience(props.id);
  if (!experience) return null;

  const image = isDark ? experience.darkImage : experience.lightImage;

  return (
    <BaseOverlay
      to={`/experience/${experience.slug}`}
      icon={image}
      label={generateExperienceTitle(experience)}
      className={props.className}
    />
  );
};

export default Overlay;

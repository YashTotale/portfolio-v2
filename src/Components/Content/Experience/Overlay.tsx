// React Imports
import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import BaseOverlay from "../../Atomic/Overlay";
import { useTitle } from "../../../Context/HeadContext";
import { generateSearch } from "../../../Utils/funcs";
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

  const location = useLocation();
  const title = useTitle();

  const experience = getSingleExperience(props.id);
  if (!experience) return null;

  const image = isDark ? experience.darkImage : experience.lightImage;

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
      icon={image}
      label={generateExperienceTitle(experience)}
      className={props.className}
    />
  );
};

export default Overlay;

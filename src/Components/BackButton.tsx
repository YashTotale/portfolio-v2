// React Imports
import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import { generateSearch, getSearch } from "../Utils/funcs";
import NavButton from "./NavButton";

interface BackButtonProps {
  className?: string;
}

const BackButton: FC<BackButtonProps> = (props) => {
  const location = useLocation();
  const search = getSearch(location.search);

  const fromPath = search["from_path"];
  const fromTitle = search["from_title"];

  if (fromPath && fromTitle) {
    return (
      <NavButton
        label={fromTitle}
        to={{
          pathname: fromPath,
          search: generateSearch({
            from_path: location.pathname,
            from_type: "back_nav_button",
          }),
        }}
        type="previous"
        typeLabel="Back"
        className={props.className}
      />
    );
  }

  return null;
};

export default BackButton;

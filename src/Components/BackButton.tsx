// React Imports
import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import NavButton from "./NavButton";

interface BackButtonProps {
  className?: string;
}

const BackButton: FC<BackButtonProps> = (props) => {
  const location = useLocation();

  const state = location.state as Record<string, unknown>;
  const fromPath = state["from_path"] as string;
  const fromTitle = state["from_title"] as string;

  if (fromPath && fromTitle) {
    return (
      <NavButton
        label={fromTitle}
        to={{
          pathname: fromPath,
          state: {
            from_path: location.pathname,
            from_type: "back_nav_button",
          },
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

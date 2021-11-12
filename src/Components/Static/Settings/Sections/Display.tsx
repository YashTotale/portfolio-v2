// React Imports
import React, { FC } from "react";
import Section from "../Section";
import Subsection from "../Subsection";
import Item, { SelectItem, SwitchItem } from "../Item";
import { Paths } from "../../NavController";
import StyledLink from "../../../Atomic/StyledLink";

// Redux Imports
import { useSelector } from "react-redux";
import {
  toggleDarkMode,
  getSpacing,
  changeSpacing,
  getDirection,
  changeDirection,
} from "../../../../Redux";
import {
  DEFAULT_DIRECTION,
  DEFAULT_SPACING,
  DIRECTIONS,
  SPACINGS,
} from "../../../../Redux/display.slice";
import { useAppDispatch } from "../../../../Store";

// Material UI Imports
import { useTheme } from "@mui/material";
import { Computer, SettingsBrightness } from "@mui/icons-material";

const Display: FC = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const spacing = useSelector(getSpacing);
  const direction = useSelector(getDirection);

  return (
    <Section title="Display">
      <Subsection title="Theme" icon={<SettingsBrightness />}>
        <SwitchItem
          label="Dark Mode"
          checked={isDarkMode}
          onChange={() => dispatch(toggleDarkMode())}
        />
        <Item
          label="Customize Colors"
          action={<StyledLink to={Paths.Colors}>Colors Page</StyledLink>}
        />
      </Subsection>
      <Subsection title="Miscellaneous" icon={<Computer />}>
        <SelectItem
          label="Spacing Factor"
          value={spacing}
          defaultValue={DEFAULT_SPACING}
          values={SPACINGS}
          onChange={(val) => dispatch(changeSpacing(val))}
        />
        <SelectItem
          label="Direction"
          value={direction}
          defaultValue={DEFAULT_DIRECTION}
          values={DIRECTIONS}
          onChange={(val) => dispatch(changeDirection(val))}
        />
      </Subsection>
    </Section>
  );
};

export default Display;

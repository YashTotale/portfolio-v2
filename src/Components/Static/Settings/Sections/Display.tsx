// React Imports
import React, { FC } from "react";
import Section from "../Section";
import Subsection from "../Subsection";
import Item, { SelectItem, SwitchItem } from "../Item";
import { Paths } from "../../NavController";
import StyledLink from "../../../Atomic/StyledLink";
import {
  DIRECTIONS,
  SPACINGS,
  DEFAULT_USER_DISPLAY,
} from "../../../../Utils/constants";
import { useDisplay } from "../../../../Context/DisplayContext";

// Material UI Imports
import { useTheme } from "@mui/material";
import { Computer, SettingsBrightness } from "@mui/icons-material";

const Display: FC = () => {
  const { display, changeDisplay } = useDisplay();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Section title="Display">
      <Subsection title="Theme" icon={<SettingsBrightness />}>
        <SwitchItem
          label="Dark Mode"
          checked={isDarkMode}
          onChange={(checked) => changeDisplay({ darkMode: checked })}
        />
        <Item
          label="Customize Colors"
          action={<StyledLink to={Paths.Colors}>Colors Page</StyledLink>}
        />
      </Subsection>
      <Subsection title="Miscellaneous" icon={<Computer />}>
        <SelectItem
          label="Spacing Factor"
          value={display.spacing}
          defaultValue={DEFAULT_USER_DISPLAY.spacing}
          values={SPACINGS}
          onChange={(value) => changeDisplay({ spacing: value })}
        />
        <SelectItem
          label="Direction"
          value={display.direction}
          defaultValue={DEFAULT_USER_DISPLAY.direction}
          values={DIRECTIONS}
          onChange={(value) => changeDisplay({ direction: value })}
        />
      </Subsection>
    </Section>
  );
};

export default Display;

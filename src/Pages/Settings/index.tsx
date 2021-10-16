// React Imports
import React, { FC } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { useTitle } from "../../Context/HeadContext";
import { generatePageTitle, generateSearch } from "../../Utils/funcs";
import HorizontalDivider from "../../Components/Atomic/Divider/Horizontal";
import Section from "../../Components/Static/Settings/Section";
import Subsection from "../../Components/Static/Settings/Subsection";
import Item, {
  SelectInput,
  SwitchItem,
} from "../../Components/Static/Settings/Item";
import StyledLink from "../../Components/Atomic/StyledLink";

// Redux Imports
import { useSelector } from "react-redux";
import {
  toggleDarkMode,
  getSpacing,
  changeSpacing,
  getDirection,
  changeDirection,
} from "../../Redux";
import {
  DEFAULT_DIRECTION,
  DEFAULT_SPACING,
  DIRECTIONS,
  SPACINGS,
} from "../../Redux/display.slice";
import { useAppDispatch } from "../../Store";

// Material UI Imports
import { makeStyles, Typography, useTheme } from "@material-ui/core";
import { Computer, SettingsBrightness } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(1.5, 0, 1),
  },
  settings: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "stretch",
    width: "100%",
  },
}));

const Settings: FC = () => {
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title>{generatePageTitle("Settings")}</title>
      </Helmet>
      <div className={classes.settings}>
        <HorizontalDivider className={classes.divider} />
        <Typography align="center" variant="h4">
          Settings
        </Typography>
        <DisplaySettings />
      </div>
    </>
  );
};

const DisplaySettings: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const title = useTitle();
  const theme = useTheme();
  const isDarkMode = theme.palette.type === "dark";

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
          action={
            <StyledLink
              to={{
                pathname: "/colors",
                search: generateSearch(
                  {
                    from_path: location.pathname,
                    from_type: "settings",
                  },
                  title
                ),
              }}
            >
              Colors Page
            </StyledLink>
          }
        />
      </Subsection>
      <Subsection title="Miscellaneous" icon={<Computer />}>
        <SelectInput
          label="Spacing Factor"
          value={spacing}
          defaultValue={DEFAULT_SPACING}
          values={SPACINGS}
          onChange={(val) => dispatch(changeSpacing(val))}
        />
        <SelectInput
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

export default Settings;

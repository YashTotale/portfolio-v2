// React Imports
import React, { FC, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import throttle from "lodash.throttle";
import isEqual from "lodash.isequal";
import startCase from "lodash.startcase";
import { useClosableSnackbar } from "../../Hooks";
import { getTextColor } from "../../Utils/colors";
import {
  DEFAULT_USER_DISPLAY,
  COLORS,
  SCHEMES,
  SHADES,
} from "../../Utils/constants";
import { useDisplay } from "../../Context/DisplayContext";
import { generatePageTitle } from "../../Utils/funcs";
import HorizontalDivider from "../../Components/Atomic/Divider/Horizontal";

// Firebase Imports
import { Color, ColorScheme as Scheme, Shade } from "../../../types/firestore";

// Material UI Imports
import {
  Button,
  capitalize,
  MenuItem,
  Radio,
  Select,
  Slider,
  Theme,
  Tooltip,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import * as muiColors from "@mui/material/colors";
import { Check } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(0.5, 0),
  },
  divider: {
    margin: theme.spacing(0.5, 0),
  },
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  schemes: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  scheme: {
    margin: theme.spacing(0, 2),
    width: "250px",
  },
  schemeTitle: {
    textAlign: "center",
  },
  sliderDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  slider: {
    margin: theme.spacing(0, 2),
  },
  colorPicker: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    margin: theme.spacing(2, 0),
  },
}));

const Colors: FC = (props) => {
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title>{generatePageTitle("Colors")}</title>
      </Helmet>
      <HorizontalDivider className={classes.divider} />
      <Typography align="center" variant="h4" className={classes.title}>
        Create your pallette!
      </Typography>
      <div className={classes.root}>
        <div className={classes.schemes}>
          {SCHEMES.map((scheme) => (
            <ColorScheme key={scheme} scheme={scheme} />
          ))}
        </div>
        <Reset />
      </div>
    </>
  );
};

const useResetStyles = makeStyles((theme) => ({
  resetDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: theme.spacing(1),
  },
  reset: {
    textTransform: "none",
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const Reset: FC = () => {
  const { display, changeDisplay } = useDisplay();
  const isDefault = isEqual(DEFAULT_USER_DISPLAY.theme, display.theme);
  const classes = useResetStyles();
  const { enqueueSnackbar } = useClosableSnackbar();

  const reset = () => {
    const currentTheme = display.theme;
    changeDisplay({ theme: DEFAULT_USER_DISPLAY.theme });
    enqueueSnackbar("Reset Default Colors", {
      variant: "success",
      onUndo: () => {
        changeDisplay({ theme: currentTheme });

        const prevStr = Object.values(currentTheme).reduce(
          (str, values, i, arr) => {
            const last = i === arr.length - 1;
            return `${str}${startCase(values.color)} - ${values.shade}${
              last ? "" : ", "
            }`;
          },
          ""
        );

        enqueueSnackbar(`Reverted to Previous Colors (${prevStr})`, {
          variant: "success",
        });
      },
    });
  };

  return (
    <div className={classes.resetDiv}>
      <Button
        onClick={reset}
        variant="contained"
        color="primary"
        className={classes.reset}
        disabled={isDefault}
        style={
          isDefault
            ? {
                cursor: "not-allowed",
                pointerEvents: "auto",
              }
            : undefined
        }
      >
        Reset Default Colors
      </Button>
    </div>
  );
};

interface ColorSchemeProps {
  scheme: Scheme;
}

const ColorScheme: FC<ColorSchemeProps> = ({ scheme }) => {
  const classes = useStyles();
  const { display } = useDisplay();
  const currentColor = display.theme[scheme].color;
  const currentShade = display.theme[scheme].shade;

  const upperCaseScheme = capitalize(scheme);

  return (
    <div className={classes.scheme}>
      <Typography className={classes.schemeTitle} variant="h6">
        {upperCaseScheme}
      </Typography>
      <ShadeSlider scheme={scheme} currentShade={currentShade} />
      <ColorPicker
        currentColor={currentColor}
        shade={currentShade}
        scheme={scheme}
      />
    </div>
  );
};

interface ShadeSliderProps {
  scheme: Scheme;
  currentShade: Shade;
}

const ShadeSlider: FC<ShadeSliderProps> = (props) => {
  const classes = useStyles();
  const { changeDisplay } = useDisplay();
  const isDefault = isEqual(
    DEFAULT_USER_DISPLAY.theme[props.scheme].shade,
    props.currentShade
  );
  const [shade, setShade] = useState(props.currentShade);

  useEffect(() => {
    setShade(props.currentShade);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDefault]);

  const onShadeChange = throttle((newShade: Shade) => {
    changeDisplay({
      theme: {
        [props.scheme]: {
          shade: newShade,
        },
      },
    });
  }, 1000);

  const handleSlide = (newShade: Shade) => {
    if (newShade !== shade) {
      setShade(newShade);
      onShadeChange(newShade);
    }
  };

  return (
    <div className={classes.sliderDiv}>
      <Typography id="shade">Shade: </Typography>
      <Slider
        className={classes.slider}
        value={SHADES.indexOf(shade)}
        min={0}
        max={SHADES.length - 1}
        onChange={(e, i) =>
          handleSlide(SHADES[typeof i === "number" ? i : i[0]])
        }
        color={props.scheme}
      />
      <Select
        value={shade}
        size="small"
        onChange={(e) => handleSlide(e.target.value as Shade)}
      >
        {SHADES.map((shade) => (
          <MenuItem key={shade} value={shade}>
            {shade}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

interface ColorPickerProps {
  scheme: Scheme;
  shade: Shade;
  currentColor: Color;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  scheme,
  shade,
  currentColor,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.colorPicker}>
      {COLORS.map((color) => {
        return (
          <ColorBtn
            key={color}
            shade={shade}
            scheme={scheme}
            color={color}
            currentColor={currentColor}
          ></ColorBtn>
        );
      })}
    </div>
  );
};

interface ColorBtnStyleProps {
  isCurrentColor: boolean;
  color: string;
}

const useColorBtnStyles = makeStyles<Theme, ColorBtnStyleProps>((theme) => {
  const white = theme.palette.common.white;
  const black = theme.palette.common.black;
  return {
    radio: {
      padding: "0px",
      margin: "2px",
    },
    radioIcon: {
      width: 48,
      height: 48,
      backgroundColor: ({ color }) => color,
      border: `1px solid ${
        theme.palette.text[
          theme.palette.mode === "dark" ? "primary" : "disabled"
        ]
      }`,
    },
    radioIconSelected: {
      border: ({ isCurrentColor }) =>
        isCurrentColor
          ? `4px solid ${theme.palette.mode === "dark" ? white : black}`
          : "none",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    checkIcon: {
      fontSize: 30,
      color: ({ color }) => getTextColor(theme, color),
    },
  };
});

interface ColorBtnProps {
  color: Color;
  scheme: Scheme;
  shade: Shade;
  currentColor: Color;
}

const ColorBtn: React.FC<ColorBtnProps> = ({
  color,
  scheme,
  shade,
  currentColor,
}) => {
  const { changeDisplay } = useDisplay();
  const { enqueueSnackbar } = useClosableSnackbar();

  const colorHex = muiColors[color][shade];
  const classes = useColorBtnStyles({
    color: colorHex,
    isCurrentColor: color === currentColor,
  });

  const readableColor = startCase(color);

  const handleClick = () => {
    const preCurrentColor = currentColor;
    changeDisplay({
      theme: {
        [scheme]: {
          color,
        },
      },
    });
    enqueueSnackbar(`${capitalize(scheme)} Color set to '${readableColor}'`, {
      variant: "success",
      onUndo: () => {
        changeDisplay({
          theme: {
            [scheme]: {
              color: preCurrentColor,
            },
          },
        });
        enqueueSnackbar(
          `Reverted to Previous ${capitalize(scheme)} Color (${startCase(
            preCurrentColor
          )})`,
          {
            variant: "success",
          }
        );
      },
    });
  };

  return (
    <Tooltip title={readableColor}>
      <Radio
        className={classes.radio}
        color="default"
        checked={color === currentColor}
        onChange={handleClick}
        value={color}
        name={scheme}
        icon={<div className={classes.radioIcon} />}
        checkedIcon={
          <div className={`${classes.radioIcon} ${classes.radioIconSelected}`}>
            <Check className={classes.checkIcon} />
          </div>
        }
      />
    </Tooltip>
  );
};

export default Colors;

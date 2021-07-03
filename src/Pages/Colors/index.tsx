// React Imports
import React, { FC, useState } from "react";
import { Helmet } from "react-helmet";
import throttle from "lodash.throttle";
import startCase from "lodash.startcase";
import { useClosableSnackbar } from "../../Hooks";
import { generatePageTitle } from "../../Utils/funcs";
import { getTextColor } from "../../Utils/colors";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getColors,
  getShades,
  resetColors,
  changeColor,
  getIsDefaultColors,
  changeShade,
} from "../../Redux";
import {
  Color,
  COLORS,
  Scheme,
  SCHEMES,
  Shade,
  SHADES,
} from "../../Redux/display.slice";
import { useAppDispatch } from "../../Store";

// Material UI Imports
import {
  Button,
  capitalize,
  makeStyles,
  Radio,
  Slider,
  Theme,
  Tooltip,
  Typography,
} from "@material-ui/core";
import * as muiColors from "@material-ui/core/colors";
import { Check } from "@material-ui/icons";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
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
    width: "220px",
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
    margin: theme.spacing(0, 1),
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
  const isDefault = useSelector(getIsDefaultColors);
  const classes = useResetStyles();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useClosableSnackbar();

  const reset = () => {
    dispatch(resetColors());
    enqueueSnackbar("Reset Colors", {
      variant: "success",
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
  const currentColor = useSelector(getColors)[scheme];
  const currentShade = useSelector(getShades)[scheme];

  const upperCaseScheme = capitalize(scheme);

  return (
    <div className={classes.scheme}>
      <Typography className={classes.schemeTitle} variant="h6">
        {upperCaseScheme}
      </Typography>
      <ShadeSlider scheme={scheme} defaultShade={currentShade} />
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
  defaultShade: Shade;
}

const ShadeSlider: FC<ShadeSliderProps> = (props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const isDefault = useSelector(getIsDefaultColors);
  const [shade, setShade] = useState(props.defaultShade);

  useEffect(() => {
    setShade(props.defaultShade);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDefault]);

  const onShadeChange = throttle((newShade: Shade) => {
    dispatch(
      changeShade({
        [props.scheme]: newShade,
      })
    );
  }, 1000);

  const handleSlide = (e: React.ChangeEvent<any>, index: number | number[]) => {
    const i = typeof index === "number" ? index : index[0];
    const newShade = SHADES[i];
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
        onChange={handleSlide}
        color={props.scheme}
      />
      <Typography>{shade}</Typography>
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
          theme.palette.type === "dark" ? "primary" : "disabled"
        ]
      }`,
    },
    radioIconSelected: {
      border: ({ isCurrentColor }) =>
        isCurrentColor
          ? `4px solid ${theme.palette.type === "dark" ? white : black}`
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
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useClosableSnackbar();

  const colorHex = muiColors[color][shade];
  const classes = useColorBtnStyles({
    color: colorHex,
    isCurrentColor: color === currentColor,
  });

  const readableColor = startCase(color);

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(
      changeColor({
        [scheme]: color,
      })
    );
    enqueueSnackbar(`${capitalize(scheme)} Color set to ${readableColor}`, {
      variant: "success",
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

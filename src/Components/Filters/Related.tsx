// React Imports
import React, { FC, ChangeEvent } from "react";
import clsx from "clsx";
import { Filter } from "./index";

// Material UI Imports
import {
  FormControl,
  makeStyles,
  MenuItem,
  Select,
  useMediaQuery,
  useTheme,
  InputLabel,
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  itemSelected: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export interface RelatedProps {
  label: string;
  value: string[];
  values: string[];
  onChange: (value: string[]) => void;
  onClear?: () => void;
}

const Related: FC<RelatedProps> = (props) => {
  const { label, value, values, onChange } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    onChange([...(event.target.value as string[])]);
  };

  return (
    <Filter
      label={`Related ${label}`}
      actions={[
        {
          label: "Clear",
          icon: <Clear />,
          action: () => onChange([]),
        },
      ]}
    >
      <FormControl>
        {isSizeXS && <InputLabel>Related {label}</InputLabel>}
        <Select multiple value={value} onChange={handleChange}>
          {values.map((v) => (
            <MenuItem
              key={v}
              value={v}
              className={clsx({
                [classes.itemSelected]: value.includes(v),
              })}
            >
              {v}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Filter>
  );
};

export default Related;

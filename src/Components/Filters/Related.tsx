// React Imports
import React, { FC, ChangeEvent } from "react";
import clsx from "clsx";
import { Filter } from "./index";

// Material UI Imports
import { FormControl, makeStyles, MenuItem, Select } from "@material-ui/core";
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

const Related: FC<RelatedProps> = ({ label, value, values, onChange }) => {
  const classes = useStyles();

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

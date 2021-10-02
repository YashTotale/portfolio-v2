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
  ListItemAvatar,
  Avatar,
  Typography,
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  itemSelected: {
    fontWeight: theme.typography.fontWeightBold,
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  label: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    marginRight: "auto",
  },
  amount: {
    marginLeft: theme.spacing(1.5),
  },
}));

interface Value {
  label: string;
  amount?: number;
  image?: string;
}

export interface RelatedProps {
  label: string;
  value: string[];
  values: Value[];
  images?: string[];
  onChange: (value: string[]) => void;
  onClear?: () => void;
  last?: boolean;
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
          disabled: value.length === 0,
        },
      ]}
      last={props.last}
    >
      <FormControl>
        {isSizeXS && <InputLabel>Related {label}</InputLabel>}
        <Select
          multiple
          value={value}
          onChange={handleChange}
          renderValue={(val) => <>{(val as string[]).join(", ")}</>}
        >
          {values.map((v) => {
            const label = typeof v === "string" ? v : v.label;
            const image = typeof v === "string" ? null : v.image;
            const amount = typeof v === "string" ? null : v.amount;

            return (
              <MenuItem
                key={label}
                value={label}
                className={clsx({
                  [classes.itemSelected]: value.includes(label),
                })}
              >
                {typeof image === "string" && (
                  <ListItemAvatar>
                    <Avatar className={classes.avatar} src={image} />
                  </ListItemAvatar>
                )}
                <Typography className={classes.label}>{label}</Typography>
                {typeof amount === "number" && (
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    className={classes.amount}
                  >
                    ({amount})
                  </Typography>
                )}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Filter>
  );
};

export default Related;

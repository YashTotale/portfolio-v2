// React Imports
import React, { FC } from "react";
import clsx from "clsx";
import { Filter } from "./index";

// Material UI Imports
import {
  FormControl,
  MenuItem,
  Select,
  useMediaQuery,
  useTheme,
  InputLabel,
  ListItemAvatar,
  Avatar,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Clear } from "@mui/icons-material";

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

type SharedProps = {
  label: string;
  values: Value[];
  images?: string[];
  onClear?: () => void;
  last?: boolean;
};

type SingleRelated = SharedProps & {
  value: string | null;
  onChange: (value: string | null) => void;
};

type MultiRelated = SharedProps & {
  value: string[];
  onChange: (value: string[]) => void;
};

const isMultiValue = (props: RelatedProps): props is MultiRelated =>
  Array.isArray(props.value);

export type RelatedProps = SingleRelated | MultiRelated;

const Related: FC<RelatedProps> = (props) => {
  const { label, values, last, onClear } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  const handleChange = (event: SelectChangeEvent<string | string[] | null>) => {
    isMultiValue(props)
      ? props.onChange(event.target.value as unknown as string[])
      : props.onChange(event.target.value as string);
  };

  return (
    <Filter
      label={`Related ${label}`}
      actions={[
        {
          label: "Clear",
          icon: <Clear />,
          action: () => {
            onClear
              ? onClear()
              : isMultiValue(props)
              ? props.onChange([])
              : props.onChange(null);
          },
          disabled: isMultiValue(props)
            ? props.value.length === 0
            : !props.value,
        },
      ]}
      last={last}
    >
      <FormControl>
        {isSizeXS && <InputLabel>Related {label}</InputLabel>}
        <Select
          multiple={isMultiValue(props)}
          value={props.value}
          onChange={handleChange}
          size={isSizeXS ? "small" : "medium"}
          renderValue={(value) =>
            Array.isArray(value) ? value.join(", ") : value
          }
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
                  [classes.itemSelected]: isMultiValue(props)
                    ? props.value.includes(label)
                    : props.value === label,
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

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

  const handleChange = (event: ChangeEvent<{ value: any }>) => {
    isMultiValue(props)
      ? props.onChange(event.target.value as string[])
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
          renderValue={(val) =>
            isMultiValue(props) ? (
              <>{(val as string[]).join(", ")}</>
            ) : (
              (val as string)
            )
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

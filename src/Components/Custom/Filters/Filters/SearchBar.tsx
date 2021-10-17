// React Imports
import React, { FC, useState } from "react";
import throttle from "lodash.throttle";
import { Filter } from "./index";

// Material UI Imports
import { TextField, useMediaQuery, useTheme } from "@mui/material";
import { Clear } from "@mui/icons-material";

export interface SearchBarProps {
  defaultSearch: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ defaultSearch, onSearchChange }) => {
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));
  const [localSearch, setLocalSearch] = useState(defaultSearch);

  const handleChange = throttle((value: string) => {
    onSearchChange(value);
  }, 500);

  return (
    <Filter
      label="Search"
      actions={[
        {
          label: "Clear",
          icon: <Clear />,
          action: () => {
            setLocalSearch("");
            handleChange("");
          },
          disabled: localSearch.length === 0,
        },
      ]}
    >
      <TextField
        value={localSearch}
        onChange={(e) => {
          const val = e.target.value;
          setLocalSearch(val);
          handleChange(val);
        }}
        fullWidth
        size="small"
        label={isSizeXS ? "Search" : undefined}
      />
    </Filter>
  );
};

export default SearchBar;

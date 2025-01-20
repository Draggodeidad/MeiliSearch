"use client";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";

const filter = createFilterOptions();

export default function FreeSoloCreateOptionDialog({
  searchTerm,
  setSearchTerm,
  setSearchResults,
  setLoading,
}) {
  // Maneja la búsqueda
  const handleSearch = async (value) => {
    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://69.164.194.254/indexes/movies/search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer f85205aa46728d9312ab3ef7d3bf0382a06be5835ea20a6863ac43a1ca7a",
          },
          body: JSON.stringify({
            q: value,
            limit: 10,
          }),
        }
      );

      const data = await response.json();
      setSearchResults(data.hits || []);
    } catch (error) {
      console.error("Error en la búsqueda:", error);
      setSearchResults([]);
    }
    setLoading(false);
  };

  // Manejo del cambio del input con un debounce
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <Autocomplete
      value={searchTerm}
      onInputChange={(event, newInputValue) => {
        setSearchTerm(newInputValue);
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        if (params.inputValue !== "") {
          filtered.push({
            inputValue: params.inputValue,
            title: `"${params.inputValue}"`,
          });
        }
        return filtered.slice(0, 6);
      }}
      options={[]}
      getOptionLabel={(option) => {
        if (typeof option === "string") {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.title;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            {option.title}
          </li>
        );
      }}
      sx={{ width: 600 }}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          label="Buscador"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}

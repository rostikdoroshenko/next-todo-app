import React, { useEffect, useRef, useState } from "react";
import { IconButton } from "@mui/material";
import { CloseIcon } from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";

const SearchInput = ({ onChange }: { onChange: (value: string) => void }) => {
  const [searchValue, setSearchValue] = useState("");
  const lastChange = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (lastChange.current) {
      clearTimeout(lastChange.current);
    }

    lastChange.current = setTimeout(() => {
      lastChange.current = null;
      onChange(searchValue);
    }, 1000);
  }, [onChange, searchValue]);

  return (
    <span>
      <label htmlFor="title" style={{ color: "#fff" }}>
        Search Todo
      </label>
      <input
        type="text"
        id="searchValue"
        name="searchValue"
        placeholder="type title or description"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
      <IconButton
        disabled={!searchValue}
        aria-label="settings"
        color="primary"
        onClick={() => setSearchValue("")}
      >
        <CloseIcon />
      </IconButton>
    </span>
  );
};

export default SearchInput;

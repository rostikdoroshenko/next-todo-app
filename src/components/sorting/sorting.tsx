import React from "react";
import { IconButton } from "@mui/material";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

const Sorting = ({ sort, onSort }: { sort: boolean; onSort: () => void }) => {
  return (
    <span>
      <IconButton style={{ color: "#fff" }} onClick={onSort}>
        sort{sort ? <ArrowDownward /> : <ArrowUpward />}
      </IconButton>
    </span>
  );
};

export default Sorting;

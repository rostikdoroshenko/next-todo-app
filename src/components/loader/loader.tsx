import React, { ReactNode } from "react";
import { CircularProgress } from "@mui/material";
import classes from "../../app/add-todo/page.module.css";

const Loader = ({ children }: { children: ReactNode }) => {
  return (
    <div className={classes.center}>
      <div className="loading">{children}</div>
      <CircularProgress size="50px" />
    </div>
  );
};

export default Loader;

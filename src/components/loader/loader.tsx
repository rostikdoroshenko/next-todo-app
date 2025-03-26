import React, { ReactNode } from "react";
import Progress from "@/components/loader/Progress";

const Loader = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="loading">{children}</div>;
      <Progress />
    </>
  );
};

export default Loader;

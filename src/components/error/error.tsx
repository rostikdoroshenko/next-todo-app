import React from "react";

const Error = ({ error }) => {
  return (
    <div
      style={{
        color: "#ca9292",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <header>
        <h2>Something went wrong...</h2>
      </header>
      <span>{error.message}</span>
    </div>
  );
};

export default Error;

"use client";

const TodosError = ({ error }) => {
  return (
    <div>
      <header>Something went wrong...</header>
      <span>{error.message}</span>
    </div>
  );
};

export default TodosError;

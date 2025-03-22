import React, { ReactNode } from "react";

interface TodosLayoutInterface {
  children?: ReactNode;
}

const TodosLayout: React.FC<TodosLayoutInterface> = ({ children }) => {
  return <div>{children}</div>;
};

export default TodosLayout;

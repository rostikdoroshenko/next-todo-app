import { createContext } from "react";
import { Todo } from "@/models/todo-model";

export type TContext = {
  todos: Todo[];
  isLoading: boolean;
  deleteTodoFn: (id: string) => void;
  editTodoFn: (todo: Todo) => void;
};

export const TodosContext = createContext<TContext>({
  todos: [],
  isLoading: false,
  deleteTodoFn: () => {},
  editTodoFn: () => {},
});

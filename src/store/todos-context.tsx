import { createContext, Dispatch, SetStateAction } from "react";
import { Todo } from "@/models/todo-model";

export type TContext = {
  todos: Todo[];
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  deleteTodoFn: (id: string) => void;
  editTodoFn: (id: string) => void;
};

export const TodosContext = createContext<TContext>({
  todos: [],
  isLoading: false,
  setIsLoading: () => {
    throw new Error("setIsModalOpen not implemented");
  },
  deleteTodoFn: () => {},
  editTodoFn: () => {},
});

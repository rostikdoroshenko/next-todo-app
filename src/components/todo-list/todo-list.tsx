"use client";

import { todoActions } from "@/store/todo-slice";
import { Todo } from "@/models/todo-model";
import { redirect } from "next/navigation";
import React, { useMemo, useState } from "react";
import classes from "@/components/todo-list/todo-list.module.css";
import { useDispatch } from "react-redux";
import SimpleSnackbar from "@/components/snackbar/Snackbar";
import todoAPIs from "@/service/todo-api";
import AccordionItem from "@/components/accordion/Accordion";
import { TContext, TodosContext } from "@/store/todos-context";
import SearchInput from "@/components/search-input/search-input";
import Sorting from "@/components/sorting/sorting";

interface Props {
  initialTodos: Todo[];
  validateTodoPath: () => Promise<void>;
}

const TodoList: React.FC<Props> = ({ initialTodos, validateTodoPath }) => {
  const dispatch = useDispatch();
  const [todos, setTodos] = useState(initialTodos);
  const [isLoading, setIsLoading] = useState(false);
  const [isASCSorting, setIsASCSorting] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const filteredTodos = useMemo(() => {
    return todos
      .filter(
        (todo: Todo) =>
          todo.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          todo.description.toLowerCase().includes(searchValue.toLowerCase()),
      )
      .sort((a, b) =>
        isASCSorting
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title),
      );
  }, [todos, searchValue, isASCSorting]);

  async function handleDeleteTodo(id: string) {
    const prevTodos = [...todos];
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    setIsLoading(true);

    try {
      await todoAPIs.deleteTodo(id);
      dispatch(
        todoActions.toggleSnackBar({
          isOpen: true,
          message: "Todo removed successfully",
          severity: "success",
        }),
      );
    } catch (e) {
      setTodos(prevTodos);
      dispatch(
        todoActions.toggleSnackBar({
          isOpen: true,
          message: "Something went wrong...",
          severity: "error",
        }),
      );
    } finally {
      await validateTodoPath();
      setIsLoading(false);
    }
  }

  function handleEditTodo(id: string) {
    setIsLoading(true);
    redirect(`/todos/${id}`);
  }

  function handleSorting() {
    setIsASCSorting((asc) => !asc);
  }

  const ctx: TContext = {
    todos: filteredTodos,
    isLoading,
    setIsLoading,
    deleteTodoFn: handleDeleteTodo,
    editTodoFn: handleEditTodo,
  };

  return (
    <TodosContext value={ctx}>
      <div>
        <SearchInput onChange={(value) => setSearchValue(value)} />
        <Sorting sort={isASCSorting} onSort={handleSorting} />
      </div>
      <div className={classes.list}>
        {!filteredTodos.length && <p style={{ color: "#fff" }}>No todos...</p>}
        {filteredTodos.map((item) => (
          <div key={item.id} data-testid="todo-item">
            <AccordionItem
              title={item.title}
              details={item.description}
              id={item.id}
            />
          </div>
        ))}
      </div>
      <SimpleSnackbar />
    </TodosContext>
  );
};
export default TodoList;

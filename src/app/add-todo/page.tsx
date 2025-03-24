"use client";

import React, { useEffect, useState } from "react";
import todoAPIs from "@/service/todo-api";
import { redirect, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppState, Todo, TodoForm } from "@/models/todo-model";
import { todoActions } from "@/store/todo-slice";
import classes from "./page.module.css";
import AddTodoForm from "@/components/add-todo-form/AddTodoForm";

interface TodoFormProps {
  editTodo: Todo | null;
}

const TodoFormPage: React.FC<TodoFormProps> = ({ editTodo }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { todoSlug } = useParams();
  const editItem = useSelector((state: AppState) => state.editingItem);

  useEffect(() => {
    if (editTodo) {
      dispatch(todoActions.setEditItem(editTodo));
    }
    return () => {
      dispatch(todoActions.setEditItem(null));
    };
  }, [dispatch, editTodo]);

  async function addOrEditTodo(todo: TodoForm) {
    setIsLoading(true);
    const isEdit = !!editItem;
    if (todo.title) {
      console.log(isEdit);
      try {
        if (isEdit) await todoAPIs.editTodo(todo, todoSlug as string);
        else await todoAPIs.addTodo(todo);

        dispatch(
          todoActions.toggleSnackBar({
            isOpen: true,
            message: `Todo ${!!editItem ? "updated" : "added"} successfully`,
            severity: "success",
          }),
        );
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        dispatch(
          todoActions.toggleSnackBar({
            isOpen: true,
            message: "Something went wrong...",
            severity: "error",
          }),
        );
      }
      redirect("/todos");
    }
  }

  return (
    <>
      <header className={classes.header}>
        <h1>
          Add your <span className={classes.highlight}>ToDo</span>
        </h1>
      </header>
      <main className={classes.main}>
        <AddTodoForm
          isLoading={isLoading}
          editItem={editTodo || null}
          onSubmit={(todo) => addOrEditTodo(todo)}
        />
      </main>
    </>
  );
};

export default TodoFormPage;

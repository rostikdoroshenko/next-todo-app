import React from "react";
import todoAPIs from "@/service/todo-api";
import { Todo } from "@/models/todo-model";
import classes from "@/app/add-todo/page.module.css";
import AddTodoForm from "@/components/add-todo-form/AddTodoForm";
import { headers } from "next/headers";

interface Props {
  params: Promise<{
    todoSlug: string;
  }>;
}

const EditTodoPage: React.FC<Props> = async ({ params }) => {
  let todos: Todo[] = [];
  let editTodo: Todo | null = null;
  let todoSlug: string = "";
  let cookie;

  try {
    cookie = (await headers()).get("cookie") || "";
    todos = await todoAPIs.fetchTodos(cookie);
    todoSlug = (await params).todoSlug;
    editTodo = todos.find((todo) => todo.id === todoSlug) || null;
  } catch (e) {
    console.log(e);
  }

  return (
    <>
      <header className={classes.header}>
        <h1>
          Add your <span className={classes.highlight}>ToDo</span>
        </h1>
      </header>
      <main className={classes.main}>
        <AddTodoForm editItem={editTodo} id={todoSlug} cookie={cookie} />
      </main>
    </>
  );
};
export default EditTodoPage;

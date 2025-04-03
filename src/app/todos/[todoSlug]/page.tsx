import React, { Suspense } from "react";
import todoAPIs from "@/service/todo-api";
import { Todo } from "@/models/todo-model";
import classes from "@/app/add-todo/page.module.css";
import AddTodoForm from "@/components/add-todo-form/AddTodoForm";
import { headers } from "next/headers";
import Loader from "@/components/loader/loader";
import Error from "@/components/error/error";

interface Props {
  params: Promise<{
    todoSlug: string;
  }>;
}

const EditTodo = async ({ params }) => {
  let todos: Todo[] = [];
  let editTodo: Todo | null = null;
  let todoSlug: string = "";
  let error: Error;

  try {
    const cookie = (await headers()).get("cookie") || "";
    todos = await todoAPIs.fetchTodos(cookie);
    todoSlug = (await params).todoSlug;
    editTodo = todos.find((todo) => todo.id === todoSlug) || null;
  } catch (e) {
    error = e;
    console.log(e);
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <main className={classes.main}>
      {editTodo ? (
        <AddTodoForm editItem={editTodo} id={todoSlug} />
      ) : (
        <p>Not found todo with this id, please try again</p>
      )}
    </main>
  );
};

const EditTodoPage: React.FC<Props> = async ({ params }) => {
  return (
    <div className={classes.center}>
      <header className={classes.header}>
        <h1>
          Edit your <span className={classes.highlight}>ToDo</span>
        </h1>
      </header>
      <Suspense fallback={<Loader>Todo Loading...</Loader>}>
        <EditTodo params={params} />
      </Suspense>
    </div>
  );
};
export default EditTodoPage;

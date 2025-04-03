import { Todo } from "@/models/todo-model";
import { Suspense } from "react";
import classes from "./todos.module.css";
import React from "react";
import TodoList from "@/components/todo-list/todo-list";
import { revalidatePath } from "next/cache";
import todoAPIs from "@/service/todo-api";
import { headers } from "next/headers";
import Loader from "@/components/loader/loader";
import Error from "@/components/error/error";

interface Props {
  searchParams: Promise<{
    search: string;
  }>;
}

export const generateMetadata = async () => {
  const cookie = (await headers()).get("cookie") || "";
  const todos = await todoAPIs.fetchTodos(cookie);
  return {
    title: `Received ${todos.length} todos`,
  };
};

const Todos = async () => {
  let todos: Todo[] = [];
  let error = null;

  try {
    const cookie = (await headers()).get("cookie") || "";
    todos = await todoAPIs.fetchTodos(cookie);
  } catch (e) {
    console.log(e);
    error = e;
  }

  async function validatePath() {
    "use server";
    revalidatePath("/todos");
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <>
      <h2 style={{ color: "white", textAlign: "center" }}>
        {todos.length} Todos
      </h2>
      <div className={classes.cards}>
        <TodoList initialTodos={todos} validateTodoPath={validatePath} />
      </div>
    </>
  );
};

const TodosPage: React.FC<Props> = async () => {
  return (
    <main className={classes.main}>
      <h1 style={{ color: "white", textAlign: "center" }}>Todos List</h1>
      <Suspense fallback={<Loader>Fetching todos...</Loader>}>
        <Todos />
      </Suspense>
    </main>
  );
};

export default TodosPage;

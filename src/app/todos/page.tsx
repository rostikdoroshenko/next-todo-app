import { Todo } from "@/models/todo-model";
import { Suspense } from "react";
import classes from "./todos.module.css";
import React from "react";
import TodoList from "@/components/todo-list/todo-list";
import { revalidatePath } from "next/cache";
import todoAPIs from "@/service/todo-api";
import { headers } from "next/headers";
import Loader from "@/components/loader/loader";

interface Props {
  searchParams: Promise<{
    search: string;
  }>;
}

const Todos = async () => {
  let todos: Todo[] = [];

  try {
    const cookie = (await headers()).get("cookie") || "";
    todos = await todoAPIs.fetchTodos(cookie);
  } catch (e) {
    console.log(e);
  }

  async function validatePath() {
    "use server";
    revalidatePath("/todos");
  }

  return (
    <>
      <h2 style={{ color: "white", textAlign: "center" }}>
        {todos.length} Todos
      </h2>
      <div className={classes.cards}>
        <TodoList todos={todos} validateTodoPath={validatePath} />
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

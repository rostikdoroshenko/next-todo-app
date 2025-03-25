import { Todo } from "@/models/todo-model";
import { Suspense } from "react";
import classes from "./todos.module.css";
import React from "react";
import Loading from "@/app/todos/loading";
import TodoList from "@/components/todo-list/todo-list";
import { revalidatePath } from "next/cache";
import todoAPIs from "@/service/todo-api";
import { headers } from "next/headers";

interface Props {
  searchParams: Promise<{
    search: string;
  }>;
}

const Todos: React.FC<Props> = async () => {
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
    <Suspense fallback={<Loading />}>
      <main className={classes.main}>
        <h1 style={{ color: "white", textAlign: "center" }}>Todo List</h1>
        <h2 style={{ color: "white", textAlign: "center" }}>
          {todos.length} Todos
        </h2>
        <div className={classes.cards}>
          <TodoList todos={todos} validateTodoPath={validatePath} />
        </div>
      </main>
    </Suspense>
  );
};

export default Todos;

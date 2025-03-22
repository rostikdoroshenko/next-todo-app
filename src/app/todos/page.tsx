import { Todo } from "@/models/todo-model";
import { Suspense } from "react";
import classes from "./todos.module.css";
import React from "react";
import Loading from "@/app/todos/loading";
import TodoList from "@/components/todo-list/todo-list";
import { revalidatePath } from "next/cache";
import todoAPIs from "@/service/todo-api";

interface Props {
  searchParams: Promise<{
    search: string;
  }>;
}

const Todos: React.FC<Props> = async ({ searchParams }) => {
  let todos: Todo[] = [];

  try {
    const search = (await searchParams).search;
    todos = await todoAPIs.fetchTodos(search);
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

import React from "react";
import TodoFormPage from "@/app/add-todo/page";
import todoAPIs from "@/service/todo-api";
import { Todo } from "@/models/todo-model";

interface Props {
  name: string;
  params: Promise<{
    todoSlug: string;
  }>;
}

const EditTodoPage: React.FC<Props> = async ({ params }) => {
  let todos: Todo[] = [];
  let editTodo: Todo | undefined;
  let todoSlug: string = "";

  try {
    todos = await todoAPIs.fetchTodos();
    todoSlug = (await params).todoSlug;
    editTodo = todos.find((todo) => todo.id === todoSlug);
  } catch (e) {
    console.log(e);
  }

  return <TodoFormPage editTodo={editTodo} />;
};
export default EditTodoPage;

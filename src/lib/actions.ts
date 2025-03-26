"use server";

import todoAPIs from "@/service/todo-api";
import { TodoForm } from "@/models/todo-model";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function handleForm(todo: TodoForm, cookie, id?: string | null) {
  if (id) await todoAPIs.editTodo(todo, cookie, id);
  else await todoAPIs.addTodo(todo, cookie);
  revalidatePath("/todos");
  redirect("/todos");
}

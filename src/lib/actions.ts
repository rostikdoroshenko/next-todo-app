"use server";
import todoAPIs from "@/service/todo-api";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export type ActionState = {
  message: string | null;
  isEdit: boolean;
  id?: string;
};

export async function formHandleAction(
  prevState: ActionState,
  formData: FormData,
) {
  const todo = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
  };

  if (!todo.title || todo.title.trim().length < 3) {
    return { message: "invalid title" };
  }

  if (!todo.description || !todo.description.trim()) {
    return { message: "invalid description" };
  }

  try {
    const cookie = (await headers()).get("cookie") || "";
    if (prevState.id) {
      await todoAPIs.editTodo(todo, cookie, prevState.id);
    } else {
      await todoAPIs.addTodo(todo, cookie);
    }
    return {
      ...prevState,
      message: "success",
    };
  } catch (e) {
    return {
      ...prevState,
      message: "error",
    };
  } finally {
    revalidatePath("/todos");
  }
}

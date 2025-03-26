import { TodoForm } from "@/models/todo-model";

let todosUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/todos`;

const todoAPIs = {
  async fetchTodos(cookie) {
    const res = await fetch(`${todosUrl}`, {
      headers: {
        cookie: cookie,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch todos");
    }
    return res.json();
  },

  async addTodo(todo: TodoForm, cookie) {
    return await fetch(todosUrl, {
      method: "POST",
      headers: { cookie: cookie, "Content-Type": "application/json" },
      body: JSON.stringify({ ...todo }),
    });
  },
  async editTodo(todo: TodoForm, cookie, id: string) {
    return await fetch(`${todosUrl}/${id}`, {
      method: "PUT",
      headers: { cookie: cookie, "Content-Type": "application/json" },
      body: JSON.stringify({ ...todo }),
    });
  },
  async deleteTodo(id: string) {
    return await fetch(`${todosUrl}/${id}`, {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
    });
  },
};

export default todoAPIs;

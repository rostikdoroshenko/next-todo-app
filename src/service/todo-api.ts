import { TodoForm } from "@/models/todo-model";

const todosUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/todos`;

const todoAPIs = {
  async fetchTodos(cookie) {
    const res = await fetch(`${todosUrl}`, {
      next: {
        revalidate: 5,
      },
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
    const res = await fetch(todosUrl, {
      method: "POST",
      headers: { cookie: cookie, "Content-Type": "application/json" },
      body: JSON.stringify({ ...todo }),
    });
    if (!res.ok) {
      throw new Error("Failed to add todo");
    }
    return res.json();
  },

  async editTodo(todo: TodoForm, cookie, id: string) {
    const res = await fetch(`${todosUrl}/${id}`, {
      method: "PUT",
      headers: { cookie: cookie, "Content-Type": "application/json" },
      body: JSON.stringify({ ...todo }),
    });
    if (!res.ok) {
      throw new Error("Failed to edit todo");
    }
    return res.json();
  },

  async deleteTodo(id: string) {
    const res = await fetch(`${todosUrl}/${id}`, {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to delete todo");
    }
    return res.json();
  },
};

export default todoAPIs;

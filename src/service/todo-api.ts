import { Todo } from "@/models/todo-model";

const todosUrl = "http://localhost:3000/api/todos";

const todoAPIs = {
  async fetchTodos(search: string = "") {
    const res = await fetch(`${todosUrl}?search=${search}`);
    if (!res.ok) {
      throw new Error("Failed to fetch todos");
    }
    return res.json();
  },

  async addTodo(todo: Todo) {
    return await fetch(todosUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...todo }),
    });
  },
  async editTodo(todo: Todo) {
    return await fetch(`${todosUrl}/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...todo }),
    });
  },
  async deleteTodo(id: string) {
    return await fetch(`${todosUrl}/${id}`, {
      method: "DELETE",
    });
  },
};

export default todoAPIs;

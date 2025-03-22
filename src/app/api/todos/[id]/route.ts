import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";
import { Todo } from "@/models/todo-model";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  const dbPath = path.join(process.cwd(), "src", "db.json");

  try {
    const data = fs.readFileSync(dbPath, "utf8");
    const jsonData = JSON.parse(data);
    jsonData.todos = jsonData.todos.filter((todo: Todo) => todo.id !== id);

    fs.writeFileSync(dbPath, JSON.stringify(jsonData, null, 2), "utf8");
    return NextResponse.json({ id });
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  const dbPath = path.join(process.cwd(), "src", "db.json");

  try {
    const updatedEntry = await req.json();
    const data = fs.readFileSync(dbPath, "utf8");
    const jsonData = JSON.parse(data);
    jsonData.todos = jsonData.todos.map((todo: Todo) =>
      todo.id === id ? { ...updatedEntry } : todo,
    );

    fs.writeFileSync(dbPath, JSON.stringify(jsonData, null, 2), "utf8");
    return NextResponse.json(updatedEntry);
  } catch (error) {
    return NextResponse.json(error);
  }
}

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Todo } from "@/models/todo-model";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("search") ?? "";

  const dbPath = path.join(process.cwd(), "src", "db.json");

  try {
    const data = fs.readFileSync(dbPath, "utf8");
    const jsonData = JSON.parse(data);
    const todos = jsonData.todos.filter(
      (todo: Todo) =>
        todo.title.toLowerCase().includes(query.toLowerCase()) ||
        todo.description.toLowerCase().includes(query.toLowerCase()),
    );

    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(req: NextRequest) {
  const dbPath = path.join(process.cwd(), "src", "db.json");

  try {
    const newEntry = await req.json();
    const data = fs.readFileSync(dbPath, "utf8");
    const jsonData = JSON.parse(data);

    jsonData.todos.push(newEntry);

    fs.writeFileSync(dbPath, JSON.stringify(jsonData, null, 2), "utf8");
    return NextResponse.json(newEntry);
  } catch (error) {
    return NextResponse.json(error);
  }
}

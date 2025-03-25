import { NextRequest, NextResponse } from "next/server";
import collections from "@/lib/colllections";

export async function GET(req: Request) {
  try {
    const todoCollections = await collections();
    const todos = await todoCollections.find().toArray();

    const mappedTodos = todos.map((todo) => ({
      title: todo.title,
      description: todo.description,
      id: todo._id.toString(),
    }));

    return NextResponse.json(mappedTodos);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const todoCollections = await collections();
    const newEntry = await req.json();
    const res = await todoCollections.insertOne(newEntry);
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(error);
  }
}

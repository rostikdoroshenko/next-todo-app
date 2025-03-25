import { NextRequest, NextResponse } from "next/server";
import collections from "@/lib/colllections";
import { getUserId } from "@/utils/get-user-id";

export async function GET(req: Request) {
  let userId: string | false = "";
  try {
    userId = await getUserId();
    const todoCollections = await collections();

    const todos = await todoCollections.find({ userId }).toArray();

    const mappedTodos = todos.map((todo) => ({
      title: todo.title,
      description: todo.description,
      userId: todo.userId,
      id: todo._id.toString(),
    }));

    return NextResponse.json(mappedTodos);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(req: NextRequest) {
  let userId: string | false = "";
  try {
    userId = await getUserId();
    if (userId) {
      const todoCollections = await collections();
      const newEntry = await req.json();
      const res = await todoCollections.insertOne({
        ...newEntry,
        userId,
      });
      return NextResponse.json(res);
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}

import { NextRequest, NextResponse } from "next/server";
import collections from "@/lib/colllections";
import { getUserId } from "@/utils/get-user-id";

export async function GET() {
  let userId: string | false = "";
  try {
    const todoCollections = await collections();
    userId = await getUserId();

    if (userId) {
      const todos = await todoCollections.find({ userId }).toArray();

      if (!todos) {
        return NextResponse.json({ message: "Bad request" }, { status: 400 });
      }

      const mappedTodos = todos.map((todo) => ({
        title: todo.title,
        description: todo.description,
        userId: todo.userId,
        id: todo._id.toString(),
      }));

      return NextResponse.json(mappedTodos, { status: 200 });
    }

    return NextResponse.json(
      { message: "User not authorized" },
      { status: 401 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  let userId: string | false = "";
  try {
    userId = await getUserId();
    if (userId) {
      const todoCollections = await collections();
      const newEntry = await req.json();

      if (!newEntry?.title || !newEntry?.description) {
        return NextResponse.json(
          { message: "Not correct data" },
          { status: 400 },
        );
      }
      const result = await todoCollections.insertOne({
        ...newEntry,
        userId,
      });
      return NextResponse.json(
        { message: "Todo created", id: result.insertedId },
        { status: 201 },
      );
    }

    return NextResponse.json(
      { message: "User not authorized" },
      { status: 401 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import collections from "@/lib/colllections";
import { getUserId } from "@/utils/get-user-id";

type Params = Promise<{ id: string }>;

export async function DELETE(req: Request, context: { params: Params }) {
  let userId: string | false = "";
  try {
    userId = await getUserId();
    if (userId) {
      const { id } = await context.params;
      const todoCollections = await collections();
      const result = await todoCollections.findOneAndDelete({
        _id: new ObjectId(id),
      });

      if (!result) {
        return NextResponse.json(
          { message: "Todo not found", todo: result },
          { status: 404 },
        );
      }

      return NextResponse.json(
        { message: "Todo deleted", todo: result },
        { status: 200 },
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

export async function PUT(req: Request, context: { params: Params }) {
  let userId: string | false = "";
  try {
    userId = await getUserId();
    if (userId) {
      const { id } = await context.params;
      const updatedEntry = await req.json();
      const todoCollections = await collections();

      const result = await todoCollections.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { ...updatedEntry, userId } },
        { returnDocument: "after" },
      );

      if (!result) {
        return NextResponse.json(
          { message: "Todo not found", todo: result },
          { status: 404 },
        );
      }

      return NextResponse.json(
        { message: "Todo updated", todo: result },
        { status: 200 },
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

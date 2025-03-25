import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import collections from "@/lib/colllections";

type Params = Promise<{ id: string }>;

export async function DELETE(req: Request, context: { params: Params }) {
  try {
    const { id } = await context.params;
    const todoCollections = await collections();
    const result = await todoCollections.findOneAndDelete({
      _id: new ObjectId(id),
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function PUT(req: Request, context: { params: Params }) {
  try {
    const { id } = await context.params;
    const updatedEntry = await req.json();
    const todoCollections = await collections();

    const result = await todoCollections.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updatedEntry },
      { returnDocument: "after" },
    );

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}

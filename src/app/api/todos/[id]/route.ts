import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

type Params = Promise<{ id: string }>;

export async function DELETE(req: Request, context: { params: Params }) {
  try {
    const { id } = await context.params;
    const client = await MongoClient.connect(
      "mongodb+srv://gavayec:nmCJVE9oORMcsj9D@cluster0.oc7a0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    );
    const db = client.db();
    const collections = db.collection("todos");
    const result = await collections.findOneAndDelete({
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

    const client = await MongoClient.connect(
      "mongodb+srv://gavayec:nmCJVE9oORMcsj9D@cluster0.oc7a0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    );
    const db = client.db();
    const collections = db.collection("todos");

    const result = await collections.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updatedEntry },
      { returnDocument: "after" },
    );

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}

import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { MongoClient } from "mongodb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("search") ?? "";

  const dbPath = path.join(process.cwd(), "src", "db.json");

  try {
    const client = await MongoClient.connect(
      "mongodb+srv://gavayec:nmCJVE9oORMcsj9D@cluster0.oc7a0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    );
    const db = client.db();
    const collections = db.collection("todos");
    const todos = await collections.find().toArray();
    console.log(todos);
    await client.close();

    //const data = fs.readFileSync(dbPath, "utf8");
    //const jsonData = JSON.parse(data);
    // const todos = jsonData.todos.filter(
    //   (todo: Todo) =>
    //     todo.title.toLowerCase().includes(query.toLowerCase()) ||
    //     todo.description.toLowerCase().includes(query.toLowerCase()),
    // );

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
    const client = await MongoClient.connect(
      "mongodb+srv://gavayec:nmCJVE9oORMcsj9D@cluster0.oc7a0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    );
    const db = client.db();
    const collections = db.collection("todos");
    const newEntry = await req.json();
    const res = await collections.insertOne(newEntry);
    await client.close();
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(error);
  }
}

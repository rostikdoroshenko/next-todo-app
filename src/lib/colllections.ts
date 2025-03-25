import { MongoClient } from "mongodb";

const collections = async () => {
  "use server";
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();
  return db.collection("todos");
};
export default collections;

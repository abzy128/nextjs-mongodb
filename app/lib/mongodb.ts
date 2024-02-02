import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error("Please define the MONGO_URI environment variable inside .env.local");
}
export const dbClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
export const db = dbClient.db("blogdb");
export const blogs = db.collection("blogs");
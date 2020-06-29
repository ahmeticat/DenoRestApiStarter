import { MongoClient } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

const client = new MongoClient();
client.connectWithUri(Deno.env.get("DB_URI") + "");

const db = client.database("demo");

const userCollection = db.collection("users");
const bookCollection = db.collection("books");

export { userCollection, bookCollection };

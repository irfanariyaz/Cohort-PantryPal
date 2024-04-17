import { MongoClient } from "mongodb";

const connectionString = process.env.DB_URL || "";
const client = new MongoClient(connectionString);
let conn;
try {
  conn = await client.connect();
  console.log("Successfully connected to Atlas");  
} catch(e) {
  console.error(e);
}

export default conn;
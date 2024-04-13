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
finally{
  client.close();
  console.log("client closed");
}

export default conn;
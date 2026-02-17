import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const uri = process.env.MONGODB_URL;

async function test() {
  try {
    console.log("Attempting MongoDB connection to:", uri);
    const conn = await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB host:", conn.connection.host);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Connection failed:", err);
    process.exit(1);
  }
}

test();

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URL);

    console.log("MongoDB Connected:", conn.connection.host);
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

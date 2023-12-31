import mongoose from "mongoose";
import { DB_NAME } from "../constants";

export const connect = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}${DB_NAME}`);
    conn.connection.on("error", (err) => {
      console.error(err);
      process.exit(1);
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

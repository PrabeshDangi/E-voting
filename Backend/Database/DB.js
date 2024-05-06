import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectionURL = process.env.DB_URL;
const connectDB = async () => {
  try {
    const connectionIns = await mongoose.connect(connectionURL);
    console.log(
      `Database connection successful with ${connectionIns.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;

import mongoose, { connect } from "mongoose";
import env from "~/utils/envValidation";

export const connectToDB = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB  already connected.");
    return;
  }

  try {
    await connect(env.MONGODB_URL, {
      dbName: "chatApp",
    });

  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};


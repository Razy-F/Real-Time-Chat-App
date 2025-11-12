import express from "express";
import authRoutes from "~/modules/auth/auth.route";
import cookieParser from "cookie-parser";
import { connectToDB } from "./lib/db";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json()); // By that we can get access to the fields that users sends ( its going to be under the req.body )
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log("server run on PORT ", PORT);
  connectToDB();
});

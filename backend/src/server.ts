import express from "express";
import authRoutes from "~/routes/auth.route";
import { connectToDB } from "./lib/db";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json()); // By that we can get access to the fields that users sends ( its going to be under the req.body )

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log("server run on PORT ", PORT);
  connectToDB();
});

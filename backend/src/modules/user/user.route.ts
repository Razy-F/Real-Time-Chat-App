import express from "express";
import { updateProfile } from "./user.controller";

const router = express.Router();
// We acually prefixes the mentioned endpoints with '/api/auth' -  app.use("/api/auth", authRoutes);

router.get("/signup", updateProfile);

export default router;

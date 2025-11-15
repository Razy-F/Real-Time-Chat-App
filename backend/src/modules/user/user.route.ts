import express from "express";
import { updateProfile } from "./user.controller";
import { protectRoute } from "./user.middleware";

const router = express.Router();
// We acually prefixes the mentioned endpoints with '/api/auth' -  app.use("/api/auth", authRoutes);

router.put("/signup", protectRoute, updateProfile);

export default router;

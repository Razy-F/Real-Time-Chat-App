import express from "express";
import { signUp } from "~/controllers/auth.controller";

const router = express.Router();
// We acually prefixes the mentioned endpoints with '/api/auth' -  app.use("/api/auth", authRoutes);

router.get("/signup", signUp);

export default router;

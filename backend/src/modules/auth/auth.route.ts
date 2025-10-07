import express from "express";
import { signUp } from "~/modules/auth/auth.controller";

const router = express.Router();
// We acually prefixes the mentioned endpoints with '/api/auth' -  app.use("/api/auth", authRoutes);

router.get("/signup", signUp);
router.get("/login", (req, res) => {
  res.send("Login endpoint");
});
router.get("/logout", (req, res) => {
  res.send("Logout endpoint");
});

export default router;

import express from "express";
const router = express.Router();
// We acually prefixes the mentioned endpoints with '/api/auth'

router.get("/signup", (req, res) => {
  res.send("Sign Up endpoint");
});

export default router;

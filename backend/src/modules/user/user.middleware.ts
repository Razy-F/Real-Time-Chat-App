import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import env from "~/utils/envValidation";
export async function protectRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });

    const decoded = jwt.verify(token, env.JWT_SECRET);
    if (!decoded)
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
  } catch (error) {}
}

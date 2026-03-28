import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import env from "~/utils/envValidation";
import { TUser, User } from "./user.model";

export interface AuthenticatedRequest extends Request {
  user: TUser;
}

interface JwtPayloadWithUserId extends jwt.JwtPayload {
  userId: string;
}

export async function protectRoute(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });

    const decoded = jwt.verify(token, env.JWT_SECRET);

    if (
      typeof decoded === "string" ||
      !decoded ||
      typeof decoded !== "object" ||
      !("userId" in decoded)
    ) {
      return res.status(401).json({
        message: "Unauthorized - Invalid token",
      });
    }

    const payload = decoded as JwtPayloadWithUserId;

    if (!decoded)
      return res.status(401).json({ message: "Unauthorized - Invalid token" });

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

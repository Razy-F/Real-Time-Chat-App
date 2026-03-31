import { NextFunction, Response, Request } from "express";
export async function protectRoute(
  req: Request,
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
  } catch (error) {
    console.error("Error in protectRoute middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

import { Response } from "express";
import jwt from "jsonwebtoken";
import env from "~/utils/envValidation";

/**
 * Generates a JWT token for the specified user ID, sets it as an HTTP-only cookie,
 * and returns the token.
 *
 * @param {number} userId - The ID of the user to generate the token for.
 * @param {Response} res - The Express response object used to set cookies.
 * @returns {string} - The generated JWT token.
 */
export async function generateToken(
  userId: number,
  res: Response
): Promise<string> {
  // Sign a new JWT token with the user's ID, using the secret from environment variables
  const token = jwt.sign({ userId }, env.JWT_SECRET, {
    expiresIn: "7d", // Token expires in 7 days
  });

  // Set the token as an HTTP-only cookie to prevent client-side access and mitigate XSS
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true, // Ensures cookie is only accessible via HTTP(S), not JavaScript
    sameSite: "strict", // Protect against CSRF attacks
    secure: env.NODE_ENV !== "development", // Use secure cookies in production
  });

  // Return the generated token
  return token;
}

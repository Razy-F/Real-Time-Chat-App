import { Response, Request } from "express";
import z from "zod";
import { SignUpBody, signUpSchema } from "./auth.validation";

export function signUp(req: Request<{}, {}, SignUpBody>, res: Response) {
  try {
    const { fullName, email, password } = signUpSchema.parse(req.body);
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ message: error.message });
    else console.error(error);
  }
}

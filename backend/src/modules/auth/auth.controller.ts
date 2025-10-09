import { Response, Request } from "express";
import z from "zod";
import { SignUpBody, signUpSchema } from "./auth.validation";
import { User } from "../user/user.model";
import { genSalt, hash } from "bcryptjs";

export async function signUp(req: Request<{}, {}, SignUpBody>, res: Response) {
  try {
    const { fullName, email, password } = signUpSchema.parse(req.body);

    const user = await User.findOne({
      email,
    });
    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ message: error.message });
    else console.error(error);
  }
}

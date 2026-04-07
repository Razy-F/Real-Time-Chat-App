import { Response, Request } from "express";
import { compare, genSalt, hash } from "bcryptjs";
import { ZodError } from "zod";
import { generateToken } from "~/lib/jwt";
import zodFormError from "~/lib/zod-error-msg";
import { User } from "~/modules/user/user.model";
import {
  SignUpBody,
  signUpSchema,
  updateProfileSchema,
} from "./auth.validation";
import env from "~/utils/envValidation";
import cloudinary from "~/lib/cloudinary";

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
    if (newUser) {
      // generate token to authinticate the user
      generateToken(newUser.id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    if (error instanceof ZodError)
      return res.status(400).json({ message: zodFormError(error) });
    else console.error("Error in signup controller ", error);
    res.status(500).json({ message: "Invalid server error" });
  }
}

export async function logIn(
  req: Request<{}, {}, Omit<SignUpBody, "fullName">>,
  res: Response,
) {
  try {
    const { email, password } = signUpSchema
      .omit({ fullName: true })
      .parse(req.body);

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error in login controller: ", error);
    res.status(500).json({ message: "Internal server" });
  }
}

export async function logOut(_: Request, res: Response) {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
}

export async function updateProfile(req: Request, res: Response) {
  try {
    const { profilePic } = updateProfileSchema.parse(req.body);

    const userId = req.user?._id;

    const uploadRes = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadRes.secure_url },
      { new: true },
    ).select("-password"); // The new true => return the updated user object

    res.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof ZodError)
      return res.status(400).json({ message: zodFormError(error) });
    console.error("Error in login controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

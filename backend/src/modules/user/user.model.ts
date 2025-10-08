import { InferSchemaType, models } from "mongoose";
import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlenght: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
); // createdAt & updatedAt

type TUser = InferSchemaType<typeof userSchema>;

export const User = models.User || model<TUser>("User", userSchema);

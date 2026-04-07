import z from "zod";

const signUpSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpBody = z.infer<typeof signUpSchema>;

const updateProfileSchema = z.object({
  profilePic: z.string().min(1, "Profile picture is required"),
});

export { signUpSchema, SignUpBody, updateProfileSchema };

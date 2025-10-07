import z from "zod";

const signUpSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpBody = z.infer<typeof signUpSchema>;

export { signUpSchema, SignUpBody };

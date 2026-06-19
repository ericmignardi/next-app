import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required"),
  keepSignedIn: z.boolean().default(false),
});

export type SignInInput = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .transform((val) => val.trim()),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;

export const verificationSchema = z.object({
  code: z
    .string()
    .length(6, "Verification code must be exactly 6 digits")
    .regex(/^\d+$/, "Verification code must contain only numbers"),
});

export type VerificationInput = z.infer<typeof verificationSchema>;

import { ethers } from "ethers";
import { z } from "zod";
const EMAIL_SCHEMA = z
  .string()
  .min(1, "Email Address is required.")
  .email("Invalid Email Address.");

export const loginSchema = z.object({
  id: z.string().optional(),
  email: EMAIL_SCHEMA,
  userName: z.string().optional(),
  password: z.string().min(1, "Password is required."),
});

export const registerSchema = z.object({
  email: EMAIL_SCHEMA,
  username: z
    .string()
    .min(1, {
      message: "User name is required.",
    })
    .min(4, "User name must be at least 4 characters.")
    .max(24, "Maximum length of Name is 24 characters."),
  wallet: z.string().refine((value) => ethers.isAddress(value), {
    message:
      "Provided address is invalid. Please insure you have typed correctly.",
  }),
  earlyAccess: z.number().optional(),
});

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required.")
      .min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(1, "Confirm Password is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match.",
    path: ["confirmPassword"],
  });

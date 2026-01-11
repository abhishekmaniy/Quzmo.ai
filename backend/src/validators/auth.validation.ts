import { z } from "zod"

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters"),

  email: z
    .string()
    .email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Password must contain uppercase, lowercase and a number"
    ),
})

export type RegisterInput = z.infer<typeof registerSchema>

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email format"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
});

export type LoginInput = z.infer<typeof loginSchema>

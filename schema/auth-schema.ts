
import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Please write your email correctly!"),
    password: z.string().min(4, "Password must be at least 4 characters!"),
});

export const registerSchema = z.object({
    name : z.string().min(4, "Full name is required!"),
    email : z.string().email("Please write your email correctly!"),
    password : z.string().min(4, "Password must be at least 4 characters!"),
    grade: z.string().min(1, "Grade is required!"),
    school: z.string().min(1, "School is required!"),
});

export type RegisterFormInputType = z.infer<typeof registerSchema>;
export type LoginFormInputType = z.infer<typeof loginSchema>
import { z } from "zod";
import mongoose from "mongoose";

const nameSchema = z
  .string({ error: "Name is required and must be text" })
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name cannot exceed 50 characters")
  .regex(/^[A-Za-z ]+$/, "Name must contain only letters and spaces, no numbers or symbols");

const emailSchema = z
  .string({ error: "Email is required and must be text" })
  .trim()
  .email("Please provide a valid email address (e.g. name@example.com)");

export const createUserSchema = z
  .object({ name: nameSchema, email: emailSchema })
  .strict("You sent extra fields that are not allowed. Only name and email are allowed");

export const updateUserSchema = z
  .object({ name: nameSchema.optional(), email: emailSchema.optional() })
  .strict("You sent extra fields that are not allowed. Only name and email are allowed")
  .refine((data) => Object.keys(data).length > 0, "At least one field must be provided to update");

export const idParamSchema = z.object({
  id: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), { message: "User id in the URL is not valid" }),
});
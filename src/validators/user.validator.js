import { z } from "zod";
import mongoose from "mongoose";
import * as response from "../utils/response.js";

const nameSchema = z
  .string()
  .trim()
  .min(2, "Name must be between 2 and 50 characters")
  .max(50, "Name must be between 2 and 50 characters")
  .regex(/^[A-Za-z ]+$/, "Name must contain only letters and spaces");

const emailSchema = z.string().trim().email("Please provide a valid email");


const createUserSchema = z.object({
  name: nameSchema,
  email: emailSchema,
});


const updateUserSchema = z.object({
  name: nameSchema.optional(),
  email: emailSchema.optional(),
});


const idSchema = z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
  message: "Invalid user id",
});

export const validateCreateUser = (req, res, next) => {
  const result = createUserSchema.safeParse(req.body);

  if (!result.success) {
    const firstError = result.error.issues[0].message;
    return response.error(res, 400, firstError);
  }

  req.body = result.data;
  next();
};

export const validateUpdateUser = (req, res, next) => {
  const result = updateUserSchema.safeParse(req.body);

  if (!result.success) {
    const firstError = result.error.issues[0].message;
    return response.error(res, 400, firstError);
  }

  req.body = result.data;
  next();
};

export const validateId = (req, res, next) => {
  const result = idSchema.safeParse(req.params.id);

  if (!result.success) {
    return response.error(res, 400, result.error.issues[0].message);
  }

  next();
};
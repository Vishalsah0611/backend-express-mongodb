import { z } from "zod";
import mongoose from "mongoose";

const objectId = z.string({ error: "userId is required and must be text" }).refine(
  (id) => mongoose.Types.ObjectId.isValid(id),
  { message: "userId is not a valid id" }
);

const categoryEnum = z.enum(
  ["Electronics", "Clothing", "Food", "Books", "Furniture", "Other"],
  { error: "Category is required. Allowed values: Electronics, Clothing, Food, Books, Furniture, Other" }
);

export const createProductSchema = z
  .object({
    name: z.string({ error: "Name is required and must be text" }).trim().min(1, "Name cannot be empty").max(100, "Name cannot exceed 100 characters"),
    price: z.number({ error: "Price is required and must be a number" }).finite("Price must be a valid number").positive("Price must be greater than 0"),
    category: categoryEnum,
    userId: objectId,
  })
  .strict("You sent extra fields that are not allowed. Only name, price, category, userId are allowed");

export const updateProductSchema = z
  .object({
    name: z.string().trim().min(1, "Name cannot be empty").max(100, "Name cannot exceed 100 characters").optional(),
    price: z.number().finite("Price must be a valid number").positive("Price must be greater than 0").optional(),
    category: categoryEnum.optional(),
    userId: objectId.optional(),
  })
  .strict("You sent extra fields that are not allowed. Only name, price, category, userId are allowed")
  .refine((data) => Object.keys(data).length > 0, "At least one field must be provided to update");

export const productIdParamSchema = z.object({
  id: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), { message: "Product id in the URL is not valid" }),
});
import * as User from "../helpers/user.helper.js";
import * as response from "../utils/response.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  const { name, email, sort, order } = req.query;

  const filters = {};
  if (name) filters.name = name;
  if (email) filters.email = email;

  const users = await User.getAll(filters, sort, order);
  return response.success(res, 200, "Users fetched successfully", users);
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.getById(req.params.id);
  if (!user) return response.error(res, 404, "User not found");
  return response.success(res, 200, "User fetched successfully", user);
});

export const createUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  const newUser = await User.create({ name, email });
  return response.success(res, 201, "User created successfully", newUser);
});

export const updateUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  const updatedUser = await User.update(req.params.id, { name, email });
  if (!updatedUser) return response.error(res, 404, "User not found");
  return response.success(res, 200, "User updated successfully", updatedUser);
});

export const deleteUser = asyncHandler(async (req, res) => {
  const deletedUser = await User.softDelete(req.params.id);
  if (!deletedUser) return response.error(res, 404, "User not found");
  return response.success(res, 200, "User deleted successfully");
});
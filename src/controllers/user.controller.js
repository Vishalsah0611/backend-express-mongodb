import * as User from "../models/user.model.js";
import * as response from "../utils/response.js";
import { handleError } from "../utils/handleError.js";

export const getAllUsers = async (req, res) => {
  try {
    const { name, email, sort, order } = req.query;

    const filters = {};
    if (name) filters.name = name;
    if (email) filters.email = email;

    const users = await User.getAll(filters, sort, order);
    return response.success(res, 200, "Users fetched successfully", users);
  } catch (err) {
    return handleError(res, err);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.getById(req.params.id);

    if (!user) {
      return response.error(res, 404, `User with id ${req.params.id} not found`);
    }

    return response.success(res, 200, "User fetched successfully", user);
  } catch (err) {
    return handleError(res, err);
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return response.error(res, 400, "Name and email are required");
    }

    const newUser = await User.create({ name, email });
    return response.success(res, 201, "User created successfully", newUser);
  } catch (err) {
    return handleError(res, err);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (name === undefined && email === undefined) {
      return response.error(res, 400, "Provide at least one field to update (name or email)");
    }

    const updatedUser = await User.update(req.params.id, { name, email });

    if (!updatedUser) {
      return response.error(res, 404, `User with id ${req.params.id} not found`);
    }

    return response.success(res, 200, "User updated successfully", updatedUser);
  } catch (err) {
    return handleError(res, err);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.remove(req.params.id);

    if (!deleted) {
      return response.error(res, 404, `User with id ${req.params.id} not found`);
    }

    return response.success(res, 200, "User deleted successfully");
  } catch (err) {
    return handleError(res, err);
  }
};
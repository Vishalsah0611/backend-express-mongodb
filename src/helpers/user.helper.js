import User from "../models/user.model.js";

export const getAll = async (filters = {}, sortField = "createdAt", order = "asc") => {
  const query = { isDeleted: false };

  if (filters.name) {
    query.name = { $regex: filters.name, $options: "i" };
  }

  if (filters.email) {
    query.email = { $regex: filters.email, $options: "i" };
  }

  const sortOrder = order === "desc" ? -1 : 1;

  return await User.find(query).sort({ [sortField]: sortOrder });
};

export const getById = async (id) => {
  return await User.findOne({ _id: id, isDeleted: false });
};

export const create = async ({ name, email }) => {
  return await User.create({ name, email });
};

export const update = async (id, updates) => {
  return await User.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { name: updates.name, email: updates.email },
    { new: true, runValidators: true }
  );
};

export const softDelete = async (id) => {
  return await User.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true }
  );
};
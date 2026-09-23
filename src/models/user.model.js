import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      match: /^[A-Za-z ]+$/,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export const getAll = async (filters = {}, sortField = "createdAt", order = "asc") => {
  const query = {};

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
  return await User.findById(id);
};

export const create = async ({ name, email }) => {
  const newUser = await User.create({
    name,
    email,
  });

  return newUser;
};

export const update = async (id, updates) => {
  const user = await User.findByIdAndUpdate(
    id,
    {
      name: updates.name,
      email: updates.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return user;
};

export const remove = async (id) => {
  const user = await User.findByIdAndDelete(id);

  if (!user) return false;

  return true;
};
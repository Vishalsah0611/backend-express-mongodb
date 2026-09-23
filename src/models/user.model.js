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
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export const getAll = async (sortOrder) => {
  const order = sortOrder === "desc" ? -1 : 1;
  return await User.find().sort({ createdAt: order });
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
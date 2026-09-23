import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export const getAll = async () => {
  return await User.find();
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
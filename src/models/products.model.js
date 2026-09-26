import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: ["Electronics", "Clothing", "Food", "Books", "Furniture", "Other"],
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

productSchema.index({ name: 1, userId: 1 }, { unique: true });

export const Products = mongoose.model("Products", productSchema);
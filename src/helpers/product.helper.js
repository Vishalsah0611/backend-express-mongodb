import { Products } from "../models/products.model.js";

export const getAll = async (filters = {}) => {
  const query = { isDeleted: false };
  if (filters.category) query.category = filters.category;
  if (filters.name) query.name = { $regex: filters.name, $options: "i" };

  return await Products.find(query).sort({ createdAt: -1 });
};

export const getById = async (id) => {
  return await Products.findOne({ _id: id, isDeleted: false });
};

export const create = async ({ name, price, category, userId }) => {
  return await Products.create({ name, price, category, userId });
};

export const update = async (id, updates) => {
  return await Products.findOneAndUpdate(
    { _id: id, isDeleted: false },
    updates,
    { new: true, runValidators: true }
  );
};

export const softDelete = async (id) => {
  return await Products.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true }
  );
};


export const getCategoryStats = async () => {
  return await Products.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: "$category",
        totalProducts: { $sum: 1 },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
        totalValue: { $sum: "$price" },
      },
    },
    { $sort: { totalProducts: -1 } },
    {
      $project: {
        _id: 0,
        category: "$_id",
        totalProducts: 1,
        avgPrice: { $round: ["$avgPrice", 2] },
        minPrice: 1,
        maxPrice: 1,
        totalValue: 1,
      },
    },
  ]);
};


export const getAllWithUser = async (filters = {}) => {
  const match = { isDeleted: false };
  if (filters.category) match.category = filters.category;
  if (filters.name) match.name = { $regex: filters.name, $options: "i" };

  return await Products.aggregate([
    { $match: match },
    { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "user" } },
    { $unwind: "$user" },
    {
      $project: {
        name: 1,
        price: 1,
        category: 1,
        createdAt: 1,
        "user._id": 1,
        "user.name": 1,
        "user.email": 1,
      },
    },
    { $sort: { createdAt: -1 } },
  ]);
};


export const getPaginated = async (page = 1, limit = 10, filters = {}) => {
  const match = { isDeleted: false };
  if (filters.category) match.category = filters.category;
  const skip = (page - 1) * limit;

  const result = await Products.aggregate([
    { $match: match },
    {
      $facet: {
        data: [{ $sort: { createdAt: -1 } }, { $skip: skip }, { $limit: Number(limit) }],
        totalCount: [{ $count: "count" }],
      },
    },
  ]);

  const total = result[0].totalCount[0]?.count || 0;
  return { data: result[0].data, total, page: Number(page), totalPages: Math.ceil(total / limit) };
};


export const getPriceBuckets = async () => {
  return await Products.aggregate([
    { $match: { isDeleted: false } },
    {
      $bucket: {
        groupBy: "$price",
        boundaries: [0, 500, 1000, 5000, 10000, 100000],
        default: "10000+",
        output: { count: { $sum: 1 }, products: { $push: "$name" } },
      },
    },
  ]);
};


export const getMostPopularCategories = async () => {
  return await Products.aggregate([
    { $match: { isDeleted: false } },
    { $sortByCount: "$category" },
  ]);
};


export const getProductsWithTax = async (taxPercent = 18) => {
  return await Products.aggregate([
    { $match: { isDeleted: false } },
    {
      $addFields: {
        taxAmount: { $multiply: ["$price", taxPercent / 100] },
        priceWithTax: { $multiply: ["$price", 1 + taxPercent / 100] },
      },
    },
    {
      $project: {
        name: 1,
        category: 1,
        price: 1,
        taxAmount: { $round: ["$taxAmount", 2] },
        priceWithTax: { $round: ["$priceWithTax", 2] },
      },
    },
  ]);
};

export const getProductsGroupedByUser = async () => {
  return await Products.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: "$userId",
        totalProducts: { $sum: 1 },
        totalSpent: { $sum: "$price" },
        products: { $push: { name: "$name", price: "$price", category: "$category" } },
      },
    },
    { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "userInfo" } },
    { $unwind: "$userInfo" },
    {
      $project: {
        _id: 0,
        userId: "$_id",
        userName: "$userInfo.name",
        userEmail: "$userInfo.email",
        totalProducts: 1,
        totalSpent: 1,
        products: 1,
      },
    },
  ]);
};
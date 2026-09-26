import * as Product from "../helpers/product.helper.js";
import * as response from "../utils/response.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getAllProducts = asyncHandler(async (req, res) => {
  const { category, name } = req.query;
  const products = await Product.getAll({ category, name });
  return response.success(res, 200, "Products fetched successfully", products);
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.getById(req.params.id);
  if (!product) return response.error(res, 404, "Product not found");
  return response.success(res, 200, "Product fetched successfully", product);
});

export const createProduct = asyncHandler(async (req, res) => {
  const { name, price, category, userId } = req.body;
  const newProduct = await Product.create({ name, price, category, userId });
  return response.success(res, 201, "Product created successfully", newProduct);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const updatedProduct = await Product.update(req.params.id, req.body);
  if (!updatedProduct) return response.error(res, 404, "Product not found");
  return response.success(res, 200, "Product updated successfully", updatedProduct);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const deletedProduct = await Product.softDelete(req.params.id);
  if (!deletedProduct) return response.error(res, 404, "Product not found");
  return response.success(res, 200, "Product deleted successfully");
});


export const getCategoryStats = asyncHandler(async (req, res) => {
  const stats = await Product.getCategoryStats();
  return response.success(res, 200, "Category stats fetched successfully", stats);
});

export const getAllProductsWithUser = asyncHandler(async (req, res) => {
  const { category, name } = req.query;
  const products = await Product.getAllWithUser({ category, name });
  return response.success(res, 200, "Products fetched successfully", products);
});

export const getPaginatedProducts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, category } = req.query;
  const result = await Product.getPaginated(page, limit, { category });
  return response.success(res, 200, "Products fetched successfully", result);
});

export const getPriceBuckets = asyncHandler(async (req, res) => {
  const buckets = await Product.getPriceBuckets();
  return response.success(res, 200, "Price buckets fetched successfully", buckets);
});

export const getPopularCategories = asyncHandler(async (req, res) => {
  const categories = await Product.getMostPopularCategories();
  return response.success(res, 200, "Popular categories fetched successfully", categories);
});

export const getProductsWithTaxController = asyncHandler(async (req, res) => {
  const { tax } = req.query;
  const products = await Product.getProductsWithTax(tax ? Number(tax) : 18);
  return response.success(res, 200, "Products with tax fetched successfully", products);
});

export const getProductsByUser = asyncHandler(async (req, res) => {
  const grouped = await Product.getProductsGroupedByUser();
  return response.success(res, 200, "Products grouped by user fetched successfully", grouped);
});
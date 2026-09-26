import { Router } from "express";
import * as productController from "../controllers/product.controller.js";
import validate from "../middlewares/validate.js";
import { createProductSchema, updateProductSchema, productIdParamSchema } from "../validators/product.validator.js";

const router = Router();

router.get("/stats/category", productController.getCategoryStats);
router.get("/stats/price-buckets", productController.getPriceBuckets);
router.get("/stats/popular-categories", productController.getPopularCategories);
router.get("/with-user", productController.getAllProductsWithUser);
router.get("/with-tax", productController.getProductsWithTaxController);
router.get("/paginated", productController.getPaginatedProducts);
router.get("/grouped-by-user", productController.getProductsByUser);

router.get("/", productController.getAllProducts);
router.get("/:id", validate(productIdParamSchema, "params"), productController.getProductById);
router.post("/", validate(createProductSchema), productController.createProduct);
router.put("/:id", validate(productIdParamSchema, "params"), validate(updateProductSchema), productController.updateProduct);
router.delete("/:id", validate(productIdParamSchema, "params"), productController.deleteProduct);

export default router;
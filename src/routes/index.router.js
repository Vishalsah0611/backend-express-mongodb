import express from "express";
import userRouter from "./user.router.js";
import ProductsRouter from "./product.router.js";
import errorHandler from "../middlewares/errorHandler.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/products", ProductsRouter);

router.use(errorHandler);

export default router;
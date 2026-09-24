import express from "express";
import userRouter from "./user.router.js";
import * as response from "../utils/response.js";

const router = express.Router();

router.use("/users", userRouter);

router.use((err, req, res, next) => {
  if (err.code === 11000) {
    return response.error(res, 400, "Email already exists");
  }

  if (err.name === "ValidationError" || err.name === "CastError") {
    return response.error(res, 400, err.message);
  }

  return response.error(res, 500, err.message);
});

export default router;
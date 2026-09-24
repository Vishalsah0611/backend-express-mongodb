import express from "express";
import * as userController from "../controllers/user.controller.js";
import {
  validateCreateUser,
  validateUpdateUser,
  validateId,
} from "../validators/user.validator.js";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", validateId, userController.getUserById);
router.post("/", validateCreateUser, userController.createUser);
router.put("/:id", validateId, validateUpdateUser, userController.updateUser);
router.delete("/:id", validateId, userController.deleteUser);

export default router;
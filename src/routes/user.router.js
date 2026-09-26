import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import validate from "../middlewares/validate.js";
import { createUserSchema, updateUserSchema, idParamSchema } from "../validators/user.validator.js";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:id", validate(idParamSchema, "params"), userController.getUserById);
router.post("/", validate(createUserSchema), userController.createUser);
router.put("/:id", validate(idParamSchema, "params"), validate(updateUserSchema), userController.updateUser);
router.delete("/:id", validate(idParamSchema, "params"), userController.deleteUser);

export default router;
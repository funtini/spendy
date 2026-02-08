import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { createCategorySchema } from "../schemas/category.schema.js";
import * as categoriesController from "../controllers/categories.controller.js";

export const categoriesRoutes = Router();

categoriesRoutes.use(requireAuth());

categoriesRoutes.get("/", categoriesController.list);

categoriesRoutes.post(
  "/",
  validate(createCategorySchema),
  categoriesController.create,
);
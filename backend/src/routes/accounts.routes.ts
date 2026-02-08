import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import * as accountsController from "../controllers/accounts.controller.js";

export const accountsRoutes = Router();

accountsRoutes.use(requireAuth());

accountsRoutes.get("/", accountsController.list);
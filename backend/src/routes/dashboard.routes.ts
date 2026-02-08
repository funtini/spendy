import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import * as dashboardController from "../controllers/dashboard.controller.js";

export const dashboardRoutes = Router();

dashboardRoutes.use(requireAuth());

dashboardRoutes.get("/", dashboardController.get);
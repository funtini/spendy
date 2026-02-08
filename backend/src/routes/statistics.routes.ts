import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import * as statisticsController from "../controllers/statistics.controller.js";

export const statisticsRoutes = Router();

statisticsRoutes.use(requireAuth());

statisticsRoutes.get("/", statisticsController.get);

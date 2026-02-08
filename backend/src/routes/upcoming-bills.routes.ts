import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import * as upcomingBillsController from "../controllers/upcoming-bills.controller.js";

export const upcomingBillsRoutes = Router();

upcomingBillsRoutes.use(requireAuth());

upcomingBillsRoutes.get("/", upcomingBillsController.get);

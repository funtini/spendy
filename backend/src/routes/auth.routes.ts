import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";

export const authRoutes = Router();

authRoutes.post("/webhook", authController.handleWebhook);

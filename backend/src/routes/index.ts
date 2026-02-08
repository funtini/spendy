import { Router } from "express";
import { authRoutes } from "./auth.routes.js";
import { accountsRoutes } from "./accounts.routes.js";
import { transactionsRoutes } from "./transactions.routes.js";
import { categoriesRoutes } from "./categories.routes.js";
import { dashboardRoutes } from "./dashboard.routes.js";
import { statisticsRoutes } from "./statistics.routes.js";
import { upcomingBillsRoutes } from "./upcoming-bills.routes.js";

export const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/accounts", accountsRoutes);
routes.use("/transactions", transactionsRoutes);
routes.use("/categories", categoriesRoutes);
routes.use("/dashboard", dashboardRoutes);
routes.use("/statistics", statisticsRoutes);
routes.use("/upcoming-bills", upcomingBillsRoutes);

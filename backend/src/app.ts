import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { clerkMiddleware } from "./middleware/auth.js";
import { routes } from "./routes/index.js";
import { devRoutes } from "./routes/dev.routes.js";
import { errorHandler } from "./middleware/error-handler.js";

export const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  if (env.NODE_ENV === "development") {
    app.use("/api/dev", devRoutes);
  }

  app.use(clerkMiddleware());
  app.use("/api", routes);

  app.use(errorHandler);

  return app;
};

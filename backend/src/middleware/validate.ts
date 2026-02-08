import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { AppError } from "./error-handler.js";

export const validate =
  (schema: ZodSchema, source: "body" | "query" | "params" = "body") =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      const message = result.error.errors
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join(", ");
      next(new AppError(400, message));
      return;
    }
    req[source] = result.data;
    next();
  };

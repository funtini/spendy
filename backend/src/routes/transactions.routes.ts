import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import {
  createTransactionSchema,
  updateTransactionSchema,
  listTransactionsSchema,
} from "../schemas/transaction.schema.js";
import * as transactionsController from "../controllers/transactions.controller.js";

export const transactionsRoutes = Router();

transactionsRoutes.use(requireAuth());

transactionsRoutes.get(
  "/",
  validate(listTransactionsSchema, "query"),
  transactionsController.list,
);

transactionsRoutes.post(
  "/",
  validate(createTransactionSchema),
  transactionsController.create,
);

transactionsRoutes.put(
  "/:id",
  validate(updateTransactionSchema),
  transactionsController.update,
);

transactionsRoutes.delete(
  "/:id",
  transactionsController.remove,
);
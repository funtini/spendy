import { z } from "zod";
import { paginationSchema, accountIdSchema, periodSchema } from "./common.schema.js";

export const createTransactionSchema = z.object({
  accountId: z.string().min(1),
  categoryId: z.string().min(1),
  amount: z.number().int(), // cents, negative = expense
  description: z.string().min(1).max(255),
  date: z.coerce.date(),
  type: z.enum(["ONE_TIME", "RECURRING"]).default("ONE_TIME"),
  scheduleId: z.string().optional(),
});

export const updateTransactionSchema = createTransactionSchema.partial().omit({
  accountId: true,
});

export const listTransactionsSchema = paginationSchema
  .merge(accountIdSchema)
  .merge(periodSchema)
  .extend({
    categoryId: z.string().optional(),
  });

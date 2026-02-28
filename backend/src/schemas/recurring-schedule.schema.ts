import { z } from "zod";
import { accountIdSchema } from "./common.schema.js";

export const createRecurringScheduleSchema = z.object({
  accountId: z.string().min(1),
  categoryId: z.string().min(1),
  amount: z.number().int(),
  description: z.string().min(1).max(255),
  frequency: z.enum(["WEEKLY", "BIWEEKLY", "MONTHLY", "YEARLY"]),
  dayOfMonth: z.number().int().min(1).max(31).optional(),
  dayOfWeek: z.number().int().min(0).max(6).optional(),
  isActive: z.boolean().default(true),
  icon: z.string().max(50).optional(),
  color: z.string().max(20).optional(),
});

export const updateRecurringScheduleSchema = createRecurringScheduleSchema
  .partial()
  .omit({ accountId: true });

export const listRecurringSchedulesSchema = accountIdSchema;

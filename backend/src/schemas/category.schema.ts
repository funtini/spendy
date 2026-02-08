import { z } from "zod";

export const createCategorySchema = z.object({
  accountId: z.string().min(1),
  name: z.string().min(1).max(50),
  icon: z.string().min(1).max(50),
  color: z.string().min(1).max(20),
});

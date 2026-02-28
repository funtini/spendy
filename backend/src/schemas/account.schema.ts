import { z } from "zod";

export const createAccountSchema = z.object({
  name: z.string().min(1).max(100),
  currency: z.string().length(3).default("USD"),
});

export const updateAccountSchema = createAccountSchema.partial();

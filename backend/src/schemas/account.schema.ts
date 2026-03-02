import { z } from "zod";

export const createAccountSchema = z.object({
  name: z.string().min(1).max(100),
  currency: z.string().length(3).default("USD"),
  alias: z.string().max(50).optional(),
});

export const updateAccountSchema = createAccountSchema.partial();

export const addMemberSchema = z.object({
  email: z.string().email(),
  alias: z.string().max(50).optional(),
  role: z.enum(["OWNER", "EDITOR", "VIEWER"]).optional(),
});

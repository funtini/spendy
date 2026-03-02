import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { createAccountSchema, updateAccountSchema, addMemberSchema } from "../schemas/account.schema.js";
import * as accountsController from "../controllers/accounts.controller.js";

export const accountsRoutes = Router();

accountsRoutes.use(requireAuth());

accountsRoutes.get("/", accountsController.list);

accountsRoutes.post(
  "/",
  validate(createAccountSchema),
  accountsController.create,
);

accountsRoutes.patch(
  "/:id",
  validate(updateAccountSchema),
  accountsController.update,
);

accountsRoutes.delete("/:id", accountsController.remove);

accountsRoutes.post(
  "/:id/members",
  validate(addMemberSchema),
  accountsController.addMember,
);

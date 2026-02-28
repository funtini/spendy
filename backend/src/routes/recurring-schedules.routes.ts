import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import {
  createRecurringScheduleSchema,
  updateRecurringScheduleSchema,
  listRecurringSchedulesSchema,
} from "../schemas/recurring-schedule.schema.js";
import * as recurringSchedulesController from "../controllers/recurring-schedules.controller.js";

export const recurringSchedulesRoutes = Router();

recurringSchedulesRoutes.use(requireAuth());

recurringSchedulesRoutes.get(
  "/",
  validate(listRecurringSchedulesSchema, "query"),
  recurringSchedulesController.list,
);

recurringSchedulesRoutes.post(
  "/",
  validate(createRecurringScheduleSchema),
  recurringSchedulesController.create,
);

recurringSchedulesRoutes.patch(
  "/:id",
  validate(updateRecurringScheduleSchema),
  recurringSchedulesController.update,
);

recurringSchedulesRoutes.delete("/:id", recurringSchedulesController.remove);

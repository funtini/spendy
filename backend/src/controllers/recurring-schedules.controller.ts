import { Request, Response, NextFunction } from "express";
import { getAuth } from "../middleware/auth.js";
import * as accountsService from "../services/accounts.service.js";
import * as recurringSchedulesService from "../services/recurring-schedules.service.js";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);
    const { accountId } = req.query as { accountId: string };
    await accountsService.verifyAccountMembership(userId!, accountId);
    const data = await recurringSchedulesService.listRecurringSchedules(accountId);
    res.json({ data });
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);
    const { accountId, ...data } = req.body;
    await accountsService.verifyAccountMembership(userId!, accountId, ["OWNER", "EDITOR"]);
    const schedule = await recurringSchedulesService.createRecurringSchedule({ accountId, ...data });
    res.status(201).json(schedule);
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);
    const id = req.params.id;
    const accountId = (req.body.accountId ?? req.query.accountId) as string;
    await accountsService.verifyAccountMembership(userId!, accountId, ["OWNER", "EDITOR"]);
    const schedule = await recurringSchedulesService.updateRecurringSchedule(id, accountId, req.body);
    res.json(schedule);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);
    const id = req.params.id;
    const accountId = req.query.accountId as string;
    await accountsService.verifyAccountMembership(userId!, accountId, ["OWNER", "EDITOR"]);
    await recurringSchedulesService.deleteRecurringSchedule(id, accountId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

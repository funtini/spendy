import { Request, Response, NextFunction } from "express";
import { getAuth } from "../middleware/auth.js";
import * as upcomingBillsService from "../services/upcoming-bills.service.js";
import * as accountsService from "../services/accounts.service.js";

export const get = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = getAuth(req);
    const accountId = req.query.accountId as string;
    await accountsService.verifyAccountMembership(userId!, accountId);
    const data = await upcomingBillsService.getUpcomingBills(accountId);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

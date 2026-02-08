import { Request, Response, NextFunction } from "express";
import { getAuth } from "../middleware/auth.js";
import * as statisticsService from "../services/statistics.service.js";
import * as accountsService from "../services/accounts.service.js";

export const get = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = getAuth(req);
    const { accountId, month, year } = req.query as unknown as {
      accountId: string;
      month?: number;
      year?: number;
    };
    await accountsService.verifyAccountMembership(userId!, accountId);
    const data = await statisticsService.getStatistics({
      accountId,
      month,
      year,
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

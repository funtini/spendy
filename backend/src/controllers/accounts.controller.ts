import { Request, Response, NextFunction } from "express";
import { getAuth } from "../middleware/auth.js";
import * as accountsService from "../services/accounts.service.js";

export const list = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = getAuth(req);
    const data = await accountsService.listAccounts(userId!);
    res.json({ data });
  } catch (error) {
    next(error);
  }
};

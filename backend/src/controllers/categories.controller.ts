import { Request, Response, NextFunction } from "express";
import { getAuth } from "../middleware/auth.js";
import * as categoriesService from "../services/categories.service.js";
import * as accountsService from "../services/accounts.service.js";

export const list = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = getAuth(req);
    const accountId = req.query.accountId as string;
    await accountsService.verifyAccountMembership(userId!, accountId);
    const data = await categoriesService.listCategories(accountId);
    res.json({ data });
  } catch (error) {
    next(error);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = getAuth(req);
    const { accountId, name, icon, color } = req.body;
    await accountsService.verifyAccountMembership(userId!, accountId);
    const category = await categoriesService.createCategory({
      accountId,
      name,
      icon,
      color,
    });
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

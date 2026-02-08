import { Request, Response, NextFunction } from "express";
import { getAuth } from "../middleware/auth.js";
import * as transactionsService from "../services/transactions.service.js";
import * as accountsService from "../services/accounts.service.js";

export const list = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = getAuth(req);
    const { accountId, page, limit, month, year, categoryId } = req.query as unknown as {
      accountId: string;
      page: number;
      limit: number;
      month?: number;
      year?: number;
      categoryId?: string;
    };
    await accountsService.verifyAccountMembership(userId!, accountId);
    const result = await transactionsService.listTransactions({
      accountId,
      page,
      limit,
      month,
      year,
      categoryId,
    });
    res.json(result);
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
    const { accountId, ...data } = req.body;
    await accountsService.verifyAccountMembership(userId!, accountId);
    const transaction = await transactionsService.createTransaction({
      accountId,
      ...data,
    });
    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = getAuth(req);
    const id = req.params.id as string;
    const accountId = (req.body.accountId ?? req.query.accountId) as unknown as string;
    await accountsService.verifyAccountMembership(userId!, accountId);
    const transaction = await transactionsService.updateTransaction(
      id,
      accountId,
      req.body,
    );
    res.json(transaction);
  } catch (error) {
    next(error);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = getAuth(req);
    const id = req.params.id as string;
    const accountId = req.query.accountId as unknown as string;
    await accountsService.verifyAccountMembership(userId!, accountId);
    await transactionsService.deleteTransaction(id, accountId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

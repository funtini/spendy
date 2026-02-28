import { Request, Response, NextFunction } from "express";
import { getAuth } from "../middleware/auth.js";
import * as accountsService from "../services/accounts.service.js";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);
    const data = await accountsService.listAccounts(userId!);
    res.json({ data });
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);
    const account = await accountsService.createAccount(userId!, req.body);
    res.status(201).json(account);
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);
    const account = await accountsService.updateAccount(userId!, req.params.id, req.body);
    res.json(account);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);
    await accountsService.deleteAccount(userId!, req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

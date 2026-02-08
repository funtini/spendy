import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const devRoutes = Router();

devRoutes.get("/test", async (_req: Request, res: Response) => {
  const userCount = await prisma.user.count();
  const accountCount = await prisma.account.count();
  const categoryCount = await prisma.category.count();
  const transactionCount = await prisma.transaction.count();
  const scheduleCount = await prisma.recurringSchedule.count();
  const budgetCount = await prisma.budget.count();

  const recentTransactions = await prisma.transaction.findMany({
    take: 5,
    orderBy: { date: "desc" },
    include: { category: { select: { name: true } } },
  });

  res.json({
    status: "ok",
    database: "connected",
    counts: {
      users: userCount,
      accounts: accountCount,
      categories: categoryCount,
      transactions: transactionCount,
      recurringSchedules: scheduleCount,
      budgets: budgetCount,
    },
    recentTransactions: recentTransactions.map((t) => ({
      description: t.description,
      amount: t.amount / 100,
      date: t.date,
      category: t.category.name,
    })),
  });
});

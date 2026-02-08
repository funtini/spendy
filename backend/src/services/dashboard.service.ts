import { prisma } from "../lib/prisma.js";
import { startOfMonth, endOfMonth, subMonths } from "date-fns";

export const getDashboard = async (accountId: string) => {
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  // Current month spending (sum of negative amounts)
  const currentMonthAgg = await prisma.transaction.aggregate({
    where: {
      accountId,
      date: { gte: monthStart, lte: monthEnd },
      amount: { lt: 0 },
    },
    _sum: { amount: true },
  });

  const currentMonthSpending = Math.abs(currentMonthAgg._sum.amount ?? 0);

  // Monthly average over the last 6 months (excluding current)
  const sixMonthsAgo = startOfMonth(subMonths(now, 6));
  const lastMonthEnd = endOfMonth(subMonths(now, 1));

  const avgAgg = await prisma.transaction.aggregate({
    where: {
      accountId,
      date: { gte: sixMonthsAgo, lte: lastMonthEnd },
      amount: { lt: 0 },
    },
    _sum: { amount: true },
  });

  const totalPastSpending = Math.abs(avgAgg._sum.amount ?? 0);
  const monthlyAverage = Math.round(totalPastSpending / 6);

  return {
    currentMonthSpending,
    monthlyAverage,
  };
};

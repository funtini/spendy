import { prisma } from "../lib/prisma.js";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
} from "date-fns";

interface StatisticsParams {
  accountId: string;
  month?: number;
  year?: number;
}

export const getStatistics = async (params: StatisticsParams) => {
  const { accountId } = params;
  const now = new Date();
  const targetMonth = params.month ?? now.getMonth() + 1;
  const targetYear = params.year ?? now.getFullYear();
  const monthStart = startOfMonth(new Date(targetYear, targetMonth - 1));
  const monthEnd = endOfMonth(new Date(targetYear, targetMonth - 1));

  const [monthlyOverview, spendingByCategory, weeklyTrend] = await Promise.all([
    getMonthlyOverview(accountId, monthStart, monthEnd, targetMonth, targetYear),
    getSpendingByCategory(accountId, monthStart, monthEnd),
    getWeeklyTrend(accountId),
  ]);

  return { monthlyOverview, spendingByCategory, weeklyTrend };
};

const getMonthlyOverview = async (
  accountId: string,
  monthStart: Date,
  monthEnd: Date,
  month: number,
  year: number,
) => {
  const [spendingAgg, budgetResult] = await Promise.all([
    prisma.transaction.aggregate({
      where: {
        accountId,
        date: { gte: monthStart, lte: monthEnd },
        amount: { lt: 0 },
      },
      _sum: { amount: true },
    }),
    prisma.budget.findFirst({
      where: { accountId, categoryId: null, month, year },
    }),
  ]);

  const totalSpent = Math.abs(spendingAgg._sum.amount ?? 0);
  const budget = budgetResult?.amount ?? 0;

  return {
    totalSpent,
    budget,
    remaining: budget - totalSpent,
  };
};

const getSpendingByCategory = async (
  accountId: string,
  monthStart: Date,
  monthEnd: Date,
) => {
  const result = await prisma.transaction.groupBy({
    by: ["categoryId"],
    where: {
      accountId,
      date: { gte: monthStart, lte: monthEnd },
      amount: { lt: 0 },
    },
    _sum: { amount: true },
    orderBy: { _sum: { amount: "asc" } }, // most negative first = highest spending
  });

  if (result.length === 0) return [];

  const categoryIds = result.map((r) => r.categoryId);
  const categories = await prisma.category.findMany({
    where: { id: { in: categoryIds } },
  });
  const categoryMap = new Map(categories.map((c) => [c.id, c]));

  const maxSpending = Math.abs(result[0]._sum.amount ?? 0);

  return result.map((r) => {
    const cat = categoryMap.get(r.categoryId);
    const amount = Math.abs(r._sum.amount ?? 0);
    return {
      categoryId: r.categoryId,
      name: cat?.name ?? "Unknown",
      icon: cat?.icon ?? "help-circle",
      color: cat?.color ?? "#8E8E93",
      amount,
      percentage: maxSpending > 0 ? Math.round((amount / maxSpending) * 100) : 0,
    };
  });
};

const getWeeklyTrend = async (accountId: string) => {
  const now = new Date();
  const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // Monday
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

  const transactions = await prisma.transaction.findMany({
    where: {
      accountId,
      date: { gte: weekStart, lte: weekEnd },
      amount: { lt: 0 },
    },
    select: { date: true, amount: true },
  });

  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const dailyTotals = days.map((day, i) => {
    const dayStr = format(day, "yyyy-MM-dd");
    const daySpending = transactions
      .filter((t) => format(t.date, "yyyy-MM-dd") === dayStr)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    return { day: dayNames[i], amount: daySpending, percentage: 0 };
  });

  const maxAmount = Math.max(...dailyTotals.map((d) => d.amount), 1);
  dailyTotals.forEach((d) => {
    d.percentage = Math.round((d.amount / maxAmount) * 100);
  });

  return dailyTotals;
};

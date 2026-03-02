import { TransactionType } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../middleware/error-handler.js";
import { startOfMonth, endOfMonth } from "date-fns";

export interface ListTransactionsParams {
  accountId: string;
  page: number;
  limit: number;
  month?: number;
  year?: number;
  categoryId?: string;
}

export const listTransactions = async (params: ListTransactionsParams) => {
  const { accountId, page, limit, month, year, categoryId } = params;

  const now = new Date();
  const targetMonth = month ?? now.getMonth() + 1;
  const targetYear = year ?? now.getFullYear();
  const periodStart = startOfMonth(new Date(targetYear, targetMonth - 1));
  const periodEnd = endOfMonth(new Date(targetYear, targetMonth - 1));

  const where = {
    accountId,
    date: { gte: periodStart, lte: periodEnd },
    ...(categoryId && { categoryId }),
  };

  const [transactions, total, spendingAgg, budgetResult, members] = await Promise.all([
    prisma.transaction.findMany({
      where,
      include: {
        category: { select: { id: true, name: true, icon: true, color: true } },
        addedBy: { select: { id: true } },
      },
      orderBy: { date: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.transaction.count({ where }),
    prisma.transaction.aggregate({
      where: { ...where, amount: { lt: 0 } },
      _sum: { amount: true },
    }),
    prisma.budget.findFirst({
      where: {
        accountId,
        categoryId: null,
        month: targetMonth,
        year: targetYear,
      },
    }),
    prisma.accountMember.findMany({
      where: { accountId },
      select: { userId: true, alias: true },
    }),
  ]);

  const totalSpent = Math.abs(spendingAgg._sum.amount ?? 0);
  const budget = budgetResult?.amount ?? 0;

  const aliasMap = new Map(members.map((m) => [m.userId, m.alias]));

  return {
    data: transactions.map((t) => ({
      id: t.id,
      accountId: t.accountId,
      categoryId: t.categoryId,
      amount: t.amount,
      description: t.description,
      date: t.date.toISOString(),
      type: t.type,
      category: t.category,
      addedByUserId: t.addedByUserId ?? null,
      addedByAlias: t.addedByUserId ? (aliasMap.get(t.addedByUserId) ?? null) : null,
    })),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    summary: {
      totalSpent,
      budget,
      remaining: budget - totalSpent,
    },
  };
};

export const createTransaction = async (data: {
  accountId: string;
  categoryId: string;
  amount: number;
  description: string;
  date: Date;
  type: TransactionType;
  scheduleId?: string;
  addedByUserId?: string;
}) => {
  const transaction = await prisma.transaction.create({
    data,
    include: {
      category: { select: { id: true, name: true, icon: true, color: true } },
      addedBy: { select: { id: true } },
    },
  });

  // Fetch alias for the creator in this account
  let addedByAlias: string | null = null;
  if (transaction.addedByUserId) {
    const member = await prisma.accountMember.findUnique({
      where: { userId_accountId: { userId: transaction.addedByUserId, accountId: data.accountId } },
      select: { alias: true },
    });
    addedByAlias = member?.alias ?? null;
  }

  return {
    id: transaction.id,
    accountId: transaction.accountId,
    categoryId: transaction.categoryId,
    amount: transaction.amount,
    description: transaction.description,
    date: transaction.date.toISOString(),
    type: transaction.type,
    category: transaction.category,
    addedByUserId: transaction.addedByUserId ?? null,
    addedByAlias,
  };
};

export const updateTransaction = async (
  id: string,
  accountId: string,
  data: Partial<{
    categoryId: string;
    amount: number;
    description: string;
    date: Date;
    type: TransactionType;
    scheduleId: string;
  }>,
) => {
  const existing = await prisma.transaction.findFirst({
    where: { id, accountId },
  });

  if (!existing) {
    throw new AppError(404, "Transaction not found");
  }

  const transaction = await prisma.transaction.update({
    where: { id },
    data,
    include: {
      category: { select: { id: true, name: true, icon: true, color: true } },
    },
  });

  let addedByAlias: string | null = null;
  if (transaction.addedByUserId) {
    const member = await prisma.accountMember.findUnique({
      where: { userId_accountId: { userId: transaction.addedByUserId, accountId } },
      select: { alias: true },
    });
    addedByAlias = member?.alias ?? null;
  }

  return {
    id: transaction.id,
    accountId: transaction.accountId,
    categoryId: transaction.categoryId,
    amount: transaction.amount,
    description: transaction.description,
    date: transaction.date.toISOString(),
    type: transaction.type,
    category: transaction.category,
    addedByUserId: transaction.addedByUserId ?? null,
    addedByAlias,
  };
};

export const deleteTransaction = async (id: string, accountId: string) => {
  const existing = await prisma.transaction.findFirst({
    where: { id, accountId },
  });

  if (!existing) {
    throw new AppError(404, "Transaction not found");
  }

  await prisma.transaction.delete({ where: { id } });
};

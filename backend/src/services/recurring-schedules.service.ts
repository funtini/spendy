import { RecurringFrequency } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../middleware/error-handler.js";

const categorySelect = { id: true, name: true, icon: true, color: true } as const;

const format = (s: {
  id: string;
  accountId: string;
  categoryId: string;
  amount: number;
  description: string;
  frequency: RecurringFrequency;
  dayOfMonth: number | null;
  dayOfWeek: number | null;
  isActive: boolean;
  icon: string | null;
  color: string | null;
  category: { id: string; name: string; icon: string; color: string };
}) => ({
  id: s.id,
  accountId: s.accountId,
  categoryId: s.categoryId,
  amount: s.amount,
  description: s.description,
  frequency: s.frequency,
  dayOfMonth: s.dayOfMonth,
  dayOfWeek: s.dayOfWeek,
  isActive: s.isActive,
  icon: s.icon,
  color: s.color,
  category: s.category,
});

export const listRecurringSchedules = async (accountId: string) => {
  const schedules = await prisma.recurringSchedule.findMany({
    where: { accountId },
    include: { category: { select: categorySelect } },
    orderBy: [{ isActive: "desc" }, { dayOfMonth: "asc" }],
  });

  return schedules.map(format);
};

export const createRecurringSchedule = async (data: {
  accountId: string;
  categoryId: string;
  amount: number;
  description: string;
  frequency: RecurringFrequency;
  dayOfMonth?: number;
  dayOfWeek?: number;
  isActive?: boolean;
  icon?: string;
  color?: string;
}) => {
  const schedule = await prisma.recurringSchedule.create({
    data,
    include: { category: { select: categorySelect } },
  });

  return format(schedule);
};

export const updateRecurringSchedule = async (
  id: string,
  accountId: string,
  data: Partial<{
    categoryId: string;
    amount: number;
    description: string;
    frequency: RecurringFrequency;
    dayOfMonth: number;
    dayOfWeek: number;
    isActive: boolean;
    icon: string;
    color: string;
  }>,
) => {
  const existing = await prisma.recurringSchedule.findFirst({ where: { id, accountId } });
  if (!existing) throw new AppError(404, "Recurring schedule not found");

  const schedule = await prisma.recurringSchedule.update({
    where: { id },
    data,
    include: { category: { select: categorySelect } },
  });

  return format(schedule);
};

export const deleteRecurringSchedule = async (id: string, accountId: string) => {
  const existing = await prisma.recurringSchedule.findFirst({ where: { id, accountId } });
  if (!existing) throw new AppError(404, "Recurring schedule not found");

  await prisma.recurringSchedule.delete({ where: { id } });
};

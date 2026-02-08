import { prisma } from "../lib/prisma.js";

export const getUpcomingBills = async (accountId: string) => {
  const schedules = await prisma.recurringSchedule.findMany({
    where: { accountId, isActive: true },
    include: {
      category: { select: { icon: true, color: true } },
    },
    orderBy: { dayOfMonth: "asc" },
  });

  const data = schedules.map((s) => ({
    id: s.id,
    name: s.description,
    icon: s.icon ?? s.category.icon,
    color: s.color ?? s.category.color,
    amount: Math.abs(s.amount),
    dueDay: s.dayOfMonth ?? 1,
    frequency: s.frequency,
  }));

  const total = data.reduce((sum, b) => sum + b.amount, 0);

  return { data, total };
};

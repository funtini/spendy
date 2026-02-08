import { prisma } from "../lib/prisma.js";

export const listCategories = async (accountId: string) => {
  const categories = await prisma.category.findMany({
    where: { accountId },
    orderBy: { name: "asc" },
  });

  return categories.map((c) => ({
    id: c.id,
    name: c.name,
    icon: c.icon,
    color: c.color,
  }));
};

export const createCategory = async (data: {
  accountId: string;
  name: string;
  icon: string;
  color: string;
}) => {
  const category = await prisma.category.create({ data });

  return {
    id: category.id,
    name: category.name,
    icon: category.icon,
    color: category.color,
  };
};

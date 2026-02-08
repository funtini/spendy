import { prisma } from "../lib/prisma.js";
import { AppError } from "../middleware/error-handler.js";

export const listAccounts = async (clerkId: string) => {
  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: {
      accountMemberships: {
        include: {
          account: true,
        },
      },
    },
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return user.accountMemberships.map((m) => ({
    id: m.account.id,
    name: m.account.name,
    currency: m.account.currency,
    role: m.role,
  }));
};

export const verifyAccountMembership = async (
  clerkId: string,
  accountId: string,
) => {
  const user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const membership = await prisma.accountMember.findUnique({
    where: {
      userId_accountId: {
        userId: user.id,
        accountId,
      },
    },
  });

  if (!membership) {
    throw new AppError(403, "Not a member of this account");
  }

  return { userId: user.id, role: membership.role };
};

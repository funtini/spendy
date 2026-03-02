import { AccountRole } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../middleware/error-handler.js";

export const listAccounts = async (clerkId: string) => {
  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: {
      accountMemberships: {
        include: { account: true },
      },
    },
  });

  if (!user) throw new AppError(404, "User not found");

  return user.accountMemberships.map((m) => ({
    id: m.account.id,
    name: m.account.name,
    currency: m.account.currency,
    role: m.role,
    alias: m.alias ?? null,
  }));
};

export const createAccount = async (
  clerkId: string,
  data: { name: string; currency?: string; alias?: string },
) => {
  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) throw new AppError(404, "User not found");

  const account = await prisma.account.create({
    data: {
      name: data.name,
      currency: data.currency ?? "USD",
      members: {
        create: { userId: user.id, role: AccountRole.OWNER, alias: data.alias ?? null },
      },
    },
  });

  return { id: account.id, name: account.name, currency: account.currency, role: AccountRole.OWNER, alias: data.alias ?? null };
};

export const addMember = async (
  clerkId: string,
  accountId: string,
  data: { email: string; alias?: string; role?: AccountRole },
) => {
  await verifyAccountMembership(clerkId, accountId, [AccountRole.OWNER]);

  const targetUser = await prisma.user.findUnique({ where: { email: data.email } });
  if (!targetUser) throw new AppError(404, "User with that email not found");

  const existing = await prisma.accountMember.findUnique({
    where: { userId_accountId: { userId: targetUser.id, accountId } },
  });
  if (existing) throw new AppError(409, "User is already a member of this account");

  const member = await prisma.accountMember.create({
    data: {
      userId: targetUser.id,
      accountId,
      role: data.role ?? AccountRole.VIEWER,
      alias: data.alias ?? null,
    },
  });

  return { userId: targetUser.id, email: targetUser.email, role: member.role, alias: member.alias ?? null };
};

export const updateAccount = async (
  clerkId: string,
  accountId: string,
  data: { name?: string; currency?: string },
) => {
  await verifyAccountMembership(clerkId, accountId, [AccountRole.OWNER]);

  const account = await prisma.account.update({
    where: { id: accountId },
    data,
  });

  return { id: account.id, name: account.name, currency: account.currency };
};

export const deleteAccount = async (clerkId: string, accountId: string) => {
  await verifyAccountMembership(clerkId, accountId, [AccountRole.OWNER]);
  await prisma.account.delete({ where: { id: accountId } });
};

export const verifyAccountMembership = async (
  clerkId: string,
  accountId: string,
  allowedRoles?: AccountRole[],
) => {
  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) throw new AppError(404, "User not found");

  const membership = await prisma.accountMember.findUnique({
    where: { userId_accountId: { userId: user.id, accountId } },
  });

  if (!membership) throw new AppError(403, "Not a member of this account");

  if (allowedRoles && !allowedRoles.includes(membership.role)) {
    throw new AppError(403, "Insufficient permissions");
  }

  return { userId: user.id, role: membership.role };
};

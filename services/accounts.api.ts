import { api } from "./api";
import type { AccountListResponse, AccountDto, AccountMemberDto, AccountRole } from "@shared/types";

export const listAccounts = () =>
  api<AccountListResponse>("/accounts");

export const createAccount = (data: { name: string; currency?: string; alias?: string }) =>
  api<AccountDto>("/accounts", { method: "POST", body: data });

export const updateAccount = (id: string, data: { name?: string; currency?: string }) =>
  api<AccountDto>(`/accounts/${id}`, { method: "PATCH", body: data });

export const deleteAccount = (id: string) =>
  api<void>(`/accounts/${id}`, { method: "DELETE" });

export const addAccountMember = (accountId: string, data: { email: string; alias?: string; role?: AccountRole }) =>
  api<AccountMemberDto>(`/accounts/${accountId}/members`, { method: "POST", body: data });

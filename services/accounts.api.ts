import { api } from "./api";
import type { AccountListResponse, AccountDto } from "@shared/types";

export const listAccounts = () =>
  api<AccountListResponse>("/accounts");

export const createAccount = (data: { name: string; currency?: string }) =>
  api<AccountDto>("/accounts", { method: "POST", body: data });

export const updateAccount = (id: string, data: { name?: string; currency?: string }) =>
  api<AccountDto>(`/accounts/${id}`, { method: "PATCH", body: data });

export const deleteAccount = (id: string) =>
  api<void>(`/accounts/${id}`, { method: "DELETE" });

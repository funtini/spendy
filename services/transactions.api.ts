import { api } from "./api";
import type {
  TransactionListResponse,
  TransactionDto,
} from "@shared/types/index";

interface ListTransactionsParams {
  accountId: string;
  page?: number;
  limit?: number;
  month?: number;
  year?: number;
  categoryId?: string;
}

export const listTransactions = (params: ListTransactionsParams) =>
  api<TransactionListResponse>("/transactions", { params });

export const createTransaction = (data: {
  accountId: string;
  categoryId: string;
  amount: number;
  description: string;
  date: string;
  type?: "ONE_TIME" | "RECURRING";
}) => api<TransactionDto>("/transactions", { method: "POST", body: data });

export const updateTransaction = (
  id: string,
  data: {
    accountId: string;
    categoryId?: string;
    amount?: number;
    description?: string;
    date?: string;
    type?: "ONE_TIME" | "RECURRING";
  },
) => api<TransactionDto>(`/transactions/${id}`, { method: "PUT", body: data });

export const deleteTransaction = (id: string, accountId: string) =>
  api<void>(`/transactions/${id}`, {
    method: "DELETE",
    params: { accountId },
  });

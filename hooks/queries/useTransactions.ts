import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listTransactions, createTransaction, updateTransaction, deleteTransaction } from '@/services/transactions.api';

interface ListParams {
  accountId: string | null;
  page?: number;
  limit?: number;
  month?: number;
  year?: number;
  categoryId?: string;
}

export const useTransactions = (params: ListParams) =>
  useQuery({
    queryKey: ['transactions', params.accountId, params],
    queryFn: () => listTransactions({ ...params, accountId: params.accountId! }),
    enabled: !!params.accountId,
  });

export const useCreateTransaction = (accountId: string | null) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['transactions', accountId] });
      qc.invalidateQueries({ queryKey: ['dashboard', accountId] });
    },
  });
};

export const useUpdateTransaction = (accountId: string | null) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: Parameters<typeof updateTransaction>) => updateTransaction(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['transactions', accountId] });
      qc.invalidateQueries({ queryKey: ['dashboard', accountId] });
    },
  });
};

export const useDeleteTransaction = (accountId: string | null) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteTransaction(id, accountId!),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['transactions', accountId] });
      qc.invalidateQueries({ queryKey: ['dashboard', accountId] });
    },
  });
};

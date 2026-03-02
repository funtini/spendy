import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listAccounts, createAccount, updateAccount, deleteAccount, addAccountMember } from '@/services/accounts.api';
import type { AccountRole } from '@shared/types';

export const useAccounts = () =>
  useQuery({
    queryKey: ['accounts'],
    queryFn: listAccounts,
  });

export const useCreateAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAccount,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['accounts'] }),
  });
};

export const useUpdateAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name?: string; currency?: string } }) =>
      updateAccount(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['accounts'] }),
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['accounts'] }),
  });
};

export const useAddAccountMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ accountId, data }: { accountId: string; data: { email: string; alias?: string; role?: AccountRole } }) =>
      addAccountMember(accountId, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['accounts'] }),
  });
};

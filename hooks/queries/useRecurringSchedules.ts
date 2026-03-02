import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  listRecurringSchedules,
  createRecurringSchedule,
  updateRecurringSchedule,
  deleteRecurringSchedule,
} from '@/services/recurring-schedules.api';

export const useRecurringSchedules = (accountId: string | null) =>
  useQuery({
    queryKey: ['recurring-schedules', accountId],
    queryFn: () => listRecurringSchedules(accountId!),
    enabled: !!accountId,
  });

export const useCreateRecurringSchedule = (accountId: string | null) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createRecurringSchedule,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['recurring-schedules', accountId] });
      qc.invalidateQueries({ queryKey: ['upcoming-bills', accountId] });
    },
  });
};

export const useUpdateRecurringSchedule = (accountId: string | null) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: Parameters<typeof updateRecurringSchedule>) =>
      updateRecurringSchedule(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['recurring-schedules', accountId] });
      qc.invalidateQueries({ queryKey: ['upcoming-bills', accountId] });
    },
  });
};

export const useDeleteRecurringSchedule = (accountId: string | null) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteRecurringSchedule(id, accountId!),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['recurring-schedules', accountId] });
      qc.invalidateQueries({ queryKey: ['upcoming-bills', accountId] });
    },
  });
};

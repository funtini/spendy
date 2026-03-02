import { useQuery } from '@tanstack/react-query';
import { getDashboard } from '@/services/dashboard.api';

export const useDashboard = (accountId: string | null) =>
  useQuery({
    queryKey: ['dashboard', accountId],
    queryFn: () => getDashboard(accountId!),
    enabled: !!accountId,
  });

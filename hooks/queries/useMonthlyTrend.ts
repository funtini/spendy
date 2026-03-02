import { useQuery } from '@tanstack/react-query';
import { getMonthlyTrend } from '@/services/statistics.api';

export const useMonthlyTrend = (accountId: string | null, months?: number) =>
  useQuery({
    queryKey: ['monthly-trend', accountId, months],
    queryFn: () => getMonthlyTrend({ accountId: accountId!, months }),
    enabled: !!accountId,
  });

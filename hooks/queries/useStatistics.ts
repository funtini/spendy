import { useQuery } from '@tanstack/react-query';
import { getStatistics } from '@/services/statistics.api';

export const useStatistics = (accountId: string | null, month?: number, year?: number) =>
  useQuery({
    queryKey: ['statistics', accountId, month, year],
    queryFn: () => getStatistics({ accountId: accountId!, month, year }),
    enabled: !!accountId,
  });

import { useQuery } from '@tanstack/react-query';
import { getUpcomingBills } from '@/services/upcoming-bills.api';

export const useUpcomingBills = (accountId: string | null) =>
  useQuery({
    queryKey: ['upcoming-bills', accountId],
    queryFn: () => getUpcomingBills(accountId!),
    enabled: !!accountId,
  });

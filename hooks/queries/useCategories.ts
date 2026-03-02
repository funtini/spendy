import { useQuery } from '@tanstack/react-query';
import { listCategories } from '@/services/categories.api';

export const useCategories = (accountId: string | null) =>
  useQuery({
    queryKey: ['categories', accountId],
    queryFn: () => listCategories(accountId!),
    enabled: !!accountId,
  });

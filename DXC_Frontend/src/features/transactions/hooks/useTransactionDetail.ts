import { useQuery } from '@tanstack/react-query'
import { getUsers } from '@/api/endpoints/users'

export const useTransactionDetail = (publicId: string) => {
  return useQuery({
    queryKey: ['transaction', publicId],
    queryFn: () => getUsers().zaloMiniAppTransactionsAdminGetTransactionsPublicId(publicId),
    enabled: !!publicId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
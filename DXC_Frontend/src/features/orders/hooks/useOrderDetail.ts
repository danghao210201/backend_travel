import { useQuery } from '@tanstack/react-query'
import { getUsers } from '@/api/endpoints/users'

export const useOrderDetail = (publicId: string) => {
  return useQuery({
    queryKey: ['order', publicId],
    queryFn: () => getUsers().zaloMiniAppOrdersAdminGetOrdersPublicId(publicId),
    enabled: !!publicId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
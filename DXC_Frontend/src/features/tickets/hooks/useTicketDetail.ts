import { useQuery } from '@tanstack/react-query'
import { getUsers } from '@/api/endpoints/users'

export const useTicketDetail = (publicId: string) => {
  return useQuery({
    queryKey: ['ticket', publicId],
    queryFn: () => getUsers().zaloMiniAppTicketsAdminGetTicketsPublicId(publicId),
    enabled: !!publicId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getUsers } from '@/api/endpoints/users'
import type { ZaloMiniAppTicketsAdminGetTicketsParams } from '@/api/models'

export const useTickets = (params?: ZaloMiniAppTicketsAdminGetTicketsParams) => {
  return useQuery({
    queryKey: ['tickets', params],
    queryFn: () => getUsers().zaloMiniAppTicketsAdminGetTickets(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export const useCreateTicket = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: {
      name: string
      code: string
      description?: string
    }) => getUsers().zaloMiniAppTicketsAdminCreateTicket(data),
    onSuccess: () => {
      toast.success('Tạo vé thành công')
      queryClient.invalidateQueries({ queryKey: ['tickets'] })
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

export const useUpdateTicket = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: {
      publicId: string
      name: string
      code: string
      description?: string
    }) => getUsers().zaloMiniAppTicketsAdminUpdateTicket(data),
    onSuccess: () => {
      toast.success('Cập nhật vé thành công')
      queryClient.invalidateQueries({ queryKey: ['tickets'] })
      queryClient.invalidateQueries({ queryKey: ['ticket'] })
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

export const useDeleteTicket = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (publicId: string) =>
      getUsers().zaloMiniAppTicketsAdminDeleteTicket({ publicId }),
    onSuccess: () => {
      toast.success('Xóa vé thành công')
      queryClient.invalidateQueries({ queryKey: ['tickets'] })
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
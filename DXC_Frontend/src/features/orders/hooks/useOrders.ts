import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getUsers } from '@/api/endpoints/users'
import type { ZaloMiniAppOrdersAdminGetOrdersParams } from '@/api/models'

export const useOrders = (params?: ZaloMiniAppOrdersAdminGetOrdersParams) => {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => getUsers().zaloMiniAppOrdersAdminGetOrders(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export const useCreateOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: {
      name: string
      code: string
      description?: string
    }) => getUsers().zaloMiniAppOrdersMobileCreateOrder(data),
    onSuccess: () => {
      toast.success('Tạo đơn hàng thành công')
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

export const useUpdateOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: {
      publicId: string
      name: string
      code: string
      description?: string
    }) => getUsers().zaloMiniAppOrdersAdminUpdateOrder(data),
    onSuccess: () => {
      toast.success('Cập nhật đơn hàng thành công')
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      queryClient.invalidateQueries({ queryKey: ['order'] })
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

export const useDeleteOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (publicId: string) =>
      getUsers().zaloMiniAppOrdersAdminDeleteOrder({ publicId }),
    onSuccess: () => {
      toast.success('Xóa đơn hàng thành công')
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
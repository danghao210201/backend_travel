import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getUsers } from '@/api/endpoints/users'
import type { ZaloMiniAppTransactionsAdminGetTransactionsParams } from '@/api/models'

export const useTransactions = (params?: ZaloMiniAppTransactionsAdminGetTransactionsParams) => {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: () => getUsers().zaloMiniAppTransactionsAdminGetTransactions(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: {
      name: string
      code: string
      description?: string
    }) => getUsers().zaloMiniAppTransactionsMobileCreateTransaction(data),
    onSuccess: () => {
      toast.success('Tạo giao dịch thành công')
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: {
      publicId: string
      name: string
      code: string
      description?: string
    }) => getUsers().zaloMiniAppTransactionsMobileUpdateTransactionWebhook(data),
    onSuccess: () => {
      toast.success('Cập nhật giao dịch thành công')
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['transaction'] })
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (publicId: string) =>
      getUsers().postApiUsersTransactionsDelete({ publicId }),
    onSuccess: () => {
      toast.success('Xóa giao dịch thành công')
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
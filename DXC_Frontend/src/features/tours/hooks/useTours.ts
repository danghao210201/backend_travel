import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getZaloMiniAppToursAdmin } from '@/api/endpoints/zalo-mini-app-tours-admin'
import type {
  GetApiZaloMiniAppAdminToursParams,
  CreateTourCommand,
  UpdateTourCommand,
} from '@/api/models'

export const useTours = (params?: GetApiZaloMiniAppAdminToursParams) => {
  return useQuery({
    queryKey: ['tours', params],
    queryFn: () => getZaloMiniAppToursAdmin().getApiZaloMiniAppAdminTours(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export const useTourDetail = (publicId: string) => {
  return useQuery({
    queryKey: ['tour', publicId],
    queryFn: async () => {
      const response = await getZaloMiniAppToursAdmin().getApiZaloMiniAppAdminToursPublicId(publicId)
      return response.data
    },
    enabled: !!publicId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export const useCreateTour = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateTourCommand) => {
      const result = await getZaloMiniAppToursAdmin().postApiZaloMiniAppAdminToursCreate(data)
      if (!result.success) {
        throw new Error(result.message || 'Tạo tour thất bại')
      }
      return result
    },
    onSuccess: () => {
      toast.success('Tạo tour thành công')
      queryClient.invalidateQueries({ queryKey: ['tours'] })
    },
    onError: (error: Error) => {
      toast.error('Tạo tour thất bại', {
        description: error.message,
      })
    },
  })
}

export const useUpdateTour = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateTourCommand) => {
      const result = await getZaloMiniAppToursAdmin().postApiZaloMiniAppAdminToursUpdate(data)
      if (!result.success) {
        throw new Error(result.message || 'Cập nhật tour thất bại')
      }
      return result
    },
    onSuccess: () => {
      toast.success('Cập nhật tour thành công')
      queryClient.invalidateQueries({ queryKey: ['tours'] })
      queryClient.invalidateQueries({ queryKey: ['tour'] })
    },
    onError: (error: Error) => {
      toast.error('Cập nhật tour thất bại', {
        description: error.message,
      })
    },
  })
}

export const useDeleteTour = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (publicId: string) => {
      const result = await getZaloMiniAppToursAdmin().postApiZaloMiniAppAdminToursDelete({ publicId })
      if (!result.success) {
        throw new Error(result.message || 'Xóa tour thất bại')
      }
      return result
    },
    onSuccess: () => {
      toast.success('Xóa tour thành công')
      queryClient.invalidateQueries({ queryKey: ['tours'] })
    },
    onError: (error: Error) => {
      toast.error('Xóa tour thất bại', {
        description: error.message,
      })
    },
  })
}



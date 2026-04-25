export interface OrderTableRow {
  publicId?: string
  name: string | null
  code?: string | null
  description?: string | null
  createdDate?: string
}

export type { ZaloMiniAppOrdersAdminGetOrdersParams } from '@/api/models'

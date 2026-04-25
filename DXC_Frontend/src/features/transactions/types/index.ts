export interface TransactionTableRow {
  publicId?: string
  name: string | null
  code?: string | null
  description?: string | null
  createdDate?: string
}

export type { ZaloMiniAppTransactionsAdminGetTransactionsParams } from '@/api/models'

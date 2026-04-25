export interface TicketTableRow {
  publicId?: string
  name: string | null
  code?: string | null
  description?: string | null
  createdDate?: string
}

export type { ZaloMiniAppTicketsAdminGetTicketsParams } from '@/api/models'

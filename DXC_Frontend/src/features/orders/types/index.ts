export interface OrderTableRow {
  publicId: string
  bookingCode: string | null
  customerName: string | null
  phoneNumber: string | null
  tourId: number | null
  ticketId: number | null
  totalAmount: number
  status: string
  paymentStatus: string
  createdAt: string
}

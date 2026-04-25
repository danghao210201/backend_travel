import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FormPageLayout, ActionBarDivider } from '@/shared/components'
import { ChevronLeft, Edit } from 'lucide-react'
import { useOrderDetail } from '../hooks/useOrders'

export const OrderDetailPage = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { data: detailData, isLoading } = useOrderDetail(id as string)

  if (isLoading) return <div>Đang tải...</div>
  if (!detailData?.data) return <div>Không tìm thấy đơn hàng</div>

  const order = detailData.data

  return (
    <FormPageLayout
      title="Chi tiết đơn hàng"
      description="Xem chi tiết thông tin đơn đặt tour/vé"
      formTitle={`Mã đơn: ${order.bookingCode || 'N/A'}`}
      breadcrumbItems={[
        { label: 'Quản lý đơn hàng', href: '/orders' },
        { label: 'Chi tiết', current: true }
      ]}
      actionBarContent={
        <>
          <Button variant="ghost" size="sm" onClick={() => navigate('/orders')} className="gap-2">
            <ChevronLeft className="w-4 h-4 text-blue-600" /> Quay lại
          </Button>
          <ActionBarDivider />
          <Button variant="ghost" size="sm" onClick={() => navigate(`/orders/${id}/edit`)} className="gap-2">
            <Edit className="w-4 h-4 text-amber-600" /> Cập nhật trạng thái
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium border-b pb-2 mb-4">Thông tin khách hàng</h3>
          <p><strong>Khách hàng:</strong> {order.customerName}</p>
          <p><strong>Số điện thoại:</strong> {order.phoneNumber}</p>
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>Ghi chú:</strong> {order.note}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium border-b pb-2 mb-4">Thông tin dịch vụ</h3>
          {order.tourId && <p><strong>Loại:</strong> Đặt Tour (ID: {order.tourId})</p>}
          {order.ticketId && <p><strong>Loại:</strong> Đặt Vé (ID: {order.ticketId})</p>}
          <p><strong>Số lượng:</strong> {order.quantity}</p>
          <p><strong>Ngày khởi hành:</strong> {order.departureDate ? new Date(order.departureDate).toLocaleDateString('vi-VN') : 'N/A'}</p>
          <p><strong>Tổng tiền:</strong> <span className="text-red-600 font-bold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount || 0)}</span></p>
        </div>

        <div>
          <h3 className="text-lg font-medium border-b pb-2 mb-4">Trạng thái</h3>
          <p><strong>Trạng thái xử lý:</strong> {order.status}</p>
          <p><strong>Trạng thái thanh toán:</strong> {order.paymentStatus}</p>
          <p><strong>Ngày đặt:</strong> {order.createdAt ? new Date(order.createdAt).toLocaleString('vi-VN') : ''}</p>
        </div>
      </div>
    </FormPageLayout>
  )
}

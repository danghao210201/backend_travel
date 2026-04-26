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
        <div className="bg-white p-6 rounded-lg border shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Thông tin khách hàng</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Họ và tên</p>
              <p className="font-medium">{order.customerName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Số điện thoại</p>
              <p className="font-medium">{order.phoneNumber || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{order.email || 'N/A'}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Ghi chú</p>
            <p className="font-medium bg-gray-50 p-3 rounded-md border mt-1 min-h-[60px] whitespace-pre-wrap">
              {order.note || <span className="text-gray-400 italic">Không có ghi chú</span>}
            </p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Thông tin dịch vụ</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Loại dịch vụ</p>
              <p className="font-medium">
                {order.tourId ? `Đặt Tour (ID: ${order.tourId})` : order.ticketId ? `Đặt Vé (ID: ${order.ticketId})` : 'Khác'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Số lượng</p>
              <p className="font-medium">{order.quantity}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Ngày khởi hành dự kiến</p>
              <p className="font-medium">
                {order.departureDate ? new Date(order.departureDate).toLocaleDateString('vi-VN') : 'Chưa xác định'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tổng tiền</p>
              <p className="font-bold text-red-600 text-lg">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount || 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Trạng thái</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Trạng thái xử lý</p>
              <p className="font-medium">
                <span className={`px-3 py-1 text-sm font-medium rounded-full inline-block mt-1 ${
                  order.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                  order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {order.status || 'Pending'}
                </span>
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Trạng thái thanh toán</p>
              <p className="font-medium">
                <span className={`px-3 py-1 text-sm font-medium rounded-full inline-block mt-1 ${
                  order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {order.paymentStatus || 'Unpaid'}
                </span>
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Ngày đặt</p>
              <p className="font-medium">{order.createdAt ? new Date(order.createdAt).toLocaleString('vi-VN') : 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Cập nhật lần cuối</p>
              <p className="font-medium">{order.updatedAt ? new Date(order.updatedAt).toLocaleString('vi-VN') : 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </FormPageLayout>
  )
}

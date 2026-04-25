import { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FormPageLayout, ActionBarDivider } from '@/shared/components'
import { ChevronLeft, X, Check } from 'lucide-react'
import { OrderUpdateForm } from '../components/OrderUpdateForm'
import { useOrderDetail } from '../hooks/useOrders'

export const OrderEditPage = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const submitRef = useRef<(() => void) | null>(null)

  const { data: detailData, isLoading } = useOrderDetail(id as string)

  if (isLoading) return <div>Đang tải...</div>
  if (!detailData?.data) return <div>Không tìm thấy đơn hàng</div>

  return (
    <FormPageLayout
      title="Quản lý Đơn hàng"
      description="Cập nhật trạng thái đơn đặt tour/vé"
      formTitle={`Cập nhật đơn hàng: ${detailData.data.bookingCode}`}
      breadcrumbItems={[
        { label: 'Quản lý đơn hàng', href: '/orders' },
        { label: 'Cập nhật', current: true }
      ]}
      actionBarContent={
        <>
          <Button variant="ghost" size="sm" onClick={() => navigate('/orders')} className="gap-2">
            <ChevronLeft className="w-4 h-4 text-blue-600" /> Quay lại
          </Button>
          <ActionBarDivider />
          <Button variant="ghost" size="sm" onClick={() => navigate('/orders')} className="gap-2">
            <X className="w-4 h-4 text-blue-600" /> Hủy
          </Button>
          <Button variant="ghost" size="sm" onClick={() => submitRef.current?.()} className="gap-2">
            <Check className="w-4 h-4 text-blue-600" /> Lưu
          </Button>
        </>
      }
    >
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold mb-2">Thông tin khách hàng:</h4>
        <p>Họ tên: {detailData.data.customerName}</p>
        <p>SĐT: {detailData.data.phoneNumber}</p>
        <p>Email: {detailData.data.email}</p>
        <p>Ghi chú: {detailData.data.note}</p>
      </div>
      <OrderUpdateForm initialData={detailData.data} onSuccess={() => navigate('/orders')} onSave={(submit) => { submitRef.current = submit }} />
    </FormPageLayout>
  )
}

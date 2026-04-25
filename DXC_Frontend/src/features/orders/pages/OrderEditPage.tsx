import { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FormPageLayout, ActionBarDivider } from '@/shared/components'
import { ChevronLeft, X, Check } from 'lucide-react'
import { OrderForm } from '../components/OrderForm'
import { useUpdateOrder } from '../hooks/useOrders'
import { useOrderDetail } from '../hooks/useOrderDetail'

export const OrderEditPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const updateMutation = useUpdateOrder()
  const submitRef = useRef<(() => void) | null>(null)

  // ====== DATA FETCHING ======
  const { data, isLoading, error } = useOrderDetail(id!)

  // ====== EVENT HANDLERS ======
  const handleSave = () => {
    if (submitRef.current) {
      submitRef.current()
    }
  }

  // ====== ERROR STATE ======
  if (error || !data?.data) {
    return (
      <FormPageLayout
        formTitle="Không tìm thấy"
        breadcrumbItems={[
          { label: 'Quản lý đơn hàng', href: '/orders' }
        ]}
        actionBarContent={
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/orders')}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4 text-blue-600" />
            Quay lại
          </Button>
        }
      >
        <p className="text-center text-gray-600 py-8">
          Đơn hàng không tồn tại hoặc đã bị xóa.
        </p>
      </FormPageLayout>
    )
  }

  const item = data.data

  // ====== RENDER ======
  return (
    <FormPageLayout
     title="Quản lý đơn hàng"
        description="Danh sách tất cả đơn hàng và quyền hạn"
      formTitle={`Chỉnh sửa: ${item.name}`}
      breadcrumbItems={[
        { label: 'Quản lý đơn hàng', href: '/orders' },
        { label: 'Chỉnh sửa', current: true }
      ]}
      actionBarContent={
        <>
          {/* Navigation: Back */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/orders')}
            disabled={updateMutation.isPending || isLoading}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4 text-blue-600" />
            Quay lại
          </Button>

          {/* Divider */}
          <ActionBarDivider />

          {/* Form Actions: Cancel, Save */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/orders')}
            disabled={updateMutation.isPending || isLoading}
            className="gap-2"
          >
            <X className="w-4 h-4 text-blue-600" />
            Hủy
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            disabled={updateMutation.isPending || isLoading}
            className="gap-2"
          >
            <Check className="w-4 h-4 text-blue-600" />
            {updateMutation.isPending ? 'Đang lưu...' : 'Lưu'}
          </Button>
        </>
      }
    >
      {/* Form Component */}
      <OrderForm
        initialData={item}
        onSuccess={() => navigate('/orders')}
        onSave={(submit) => {
          submitRef.current = submit
        }}
      />
    </FormPageLayout>
  )
}

export default OrderEditPage
